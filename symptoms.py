import yaml
from joblib import dump, load
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.naive_bayes import MultinomialNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
import pickle

class DiseasePrediction:
    def __init__(self, model_name=None):

        self.verbose = False
        # Load Training Data
        self.train_features, self.train_labels, self.train_df = self._load_train_dataset()
        # Load Test Data
        self.test_features, self.test_labels, self.test_df = self._load_test_dataset()
        # Model Definition
        self.model_name = model_name
        # Model Save Path
        self.model_save_path = './saved_model/'

    # Function to Load Train Dataset
    def _load_train_dataset(self):
        df_train = pd.read_csv('./dataset/Training.csv')
        cols = df_train.columns
        cols = cols[:-2]
        train_features = df_train[cols]
        train_labels = df_train['prognosis']

        # Check for data sanity
        assert (len(train_features.iloc[0]) == 132)
        assert (len(train_labels) == train_features.shape[0])

        if self.verbose:
            print("Length of Training Data: ", df_train.shape)
            print("Training Features: ", train_features.shape)
            print("Training Labels: ", train_labels.shape)
        return train_features, train_labels, df_train

    # Function to Load Test Dataset
    def _load_test_dataset(self):
        df_test = pd.read_csv('./dataset/Testing.csv')
        cols = df_test.columns
        cols = cols[:-1]
        test_features = df_test[cols]
        test_labels = df_test['prognosis']

        # Check for data sanity
        assert (len(test_features.iloc[0]) == 132)
        assert (len(test_labels) == test_features.shape[0])

        if self.verbose:
            print("Length of Test Data: ", df_test.shape)
            print("Test Features: ", test_features.shape)
            print("Test Labels: ", test_labels.shape)
        return test_features, test_labels, df_test



    # Dataset Train Validation Split
    def _train_val_split(self):
        X_train, X_val, y_train, y_val = train_test_split(self.train_features,
                                                          self.train_labels,
                                                          test_size=0.33,
                                                          random_state=101)

        if self.verbose:
            print("Number of Training Features: {0}\tNumber of Training Labels: {1}".format(len(X_train), len(y_train)))
            print("Number of Validation Features: {0}\tNumber of Validation Labels: {1}".format(len(X_val), len(y_val)))
        return X_train, y_train, X_val, y_val

    # Model Selection
    def select_model(self):
        if self.model_name == 'mnb':
            self.clf = MultinomialNB()
        elif self.model_name == 'decision_tree':
            self.clf = DecisionTreeClassifier(criterion='entropy')
        elif self.model_name == 'random_forest':
            self.clf = RandomForestClassifier(n_estimators=10)
        elif self.model_name == 'gradient_boost':
            self.clf = GradientBoostingClassifier(n_estimators=150,
                                                  criterion='friedman_mse')
        return self.clf

    # ML Model
    def train_model(self):
        # Get the Data
        X_train, y_train, X_val, y_val = self._train_val_split()
        classifier = self.select_model()
        # Training the Model
        classifier = classifier.fit(X_train, y_train)
        # Trained Model Evaluation on Validation Dataset
        confidence = classifier.score(X_val, y_val)
        # Validation Data Prediction
        y_pred = classifier.predict(X_val)
        # Model Validation Accuracy
        accuracy = accuracy_score(y_val, y_pred)
        # Model Confusion Matrix
        conf_mat = confusion_matrix(y_val, y_pred)
        # Model Classification Report
        clf_report = classification_report(y_val, y_pred)
        # Model Cross Validation Score
        score = cross_val_score(classifier, X_val, y_val, cv=3)

        if self.verbose:
            print('\nTraining Accuracy: ', confidence)
            print('\nValidation Prediction: ', y_pred)
            print('\nValidation Accuracy: ', accuracy)
            print('\nValidation Confusion Matrix: \n', conf_mat)
            print('\nCross Validation Score: \n', score)
            print('\nClassification Report: \n', clf_report)

        # Save Trained Model
        '''dump(classifier, str(self.model_save_path + self.model_name + ".joblib"))
        print('here saving new model')
        filename = 'finalized_model.sav'
        pickle.dump(classifier, open(filename, 'wb'))'''

        '''---------------------------deploying model to IBM watson-------------------------------------'''
        from ibm_watson_machine_learning import APIClient
        import json
        import numpy as np
        import safe
        val_credentials = {
            "apikey":safe.apikey,
            "url":safe.url
        }

        vml_client = APIClient(val_credentials)
        vml_client.spaces.list()

        space_id = safe.space_id
        vml_client.set.default_space(space_id)
        MODEL_NAME = 'resource'
        DEPLOYMENT_NAME = 'mlcode'
        BEST_MODEL = classifier

        software_spec_uid = vml_client.software_specifications.get_id_by_name('default_py3.7_opence')
        model_props = {
            vml_client.repository.ModelMetaNames.NAME : MODEL_NAME,
            vml_client.repository.ModelMetaNames.TYPE: 'scikit-learn_0.23',
            vml_client.repository.ModelMetaNames.SOFTWARE_SPEC_UID: software_spec_uid,

        }

        model_details = vml_client.repository.store_model(
            model = BEST_MODEL,
            meta_props=model_props,
            training_data=X_train,
            training_target=y_train,
            pipeline=DecisionTreeClassifier(criterion='entropy')
        )

        model_uid = vml_client.repository.get_model_uid(model_details)

        deployment_props = {
            vml_client.deployments.ConfigurationMetaNames.NAME: DEPLOYMENT_NAME,
            vml_client.deployments.ConfigurationMetaNames.ONLINE: {}
        }

        # Deploy
        deployment = vml_client.deployments.create(
            artifact_uid=model_uid,
            meta_props=deployment_props
        )
        #print(deployment)
        deployment_uid = vml_client.deployments.get_uid(deployment)
        X_test = self.test_features
        payload={
            "input_data":[
                {"fields":X_test.columns.to_numpy().tolist(),"values":X_test.to_numpy().tolist()}
            ]
        }
        #print('payload')
        result = vml_client.deployments.score(deployment_uid,payload)
        #print('=============================result=======================')
        #print(result)

        '''pred_values = np.squeeze(result['predictions'][0]['values'])
        preddf['Scores'] = pred_values
        preddf.head()
        print(pred_values)
        preddf.to_csv('results.csv')'''

    # Function to Make Predictions on Test Data
    def make_prediction(self, saved_model_name=None, test_data=None):
        try:
            # Load Trained Model
            #clf = load(str(self.model_save_path + saved_model_name + ".joblib"))

            filename = 'finalized_model.sav'
            clf=pickle.load(open(filename, 'rb'))
        except Exception as e:
            print(e)
            print("Model not found...")

        if test_data is not None:
            #print(test_data)
            result = clf.predict(test_data)
            return result
        else:
            print(self.test_features)
            result = clf.predict(self.test_features)
        accuracy = accuracy_score(self.test_labels, result)
        clf_report = classification_report(self.test_labels, result)
        return accuracy, clf_report


if __name__ == "__main__":
    # Model Currently Training
    current_model_name = 'decision_tree'
    # Instantiate the Class
    sample=[[0]*(132)]*2
    sample[0][1]=1
    sample[0][100] = 1
    sample[0][99] = 1
    sample[0][50] = 1

    dp = DiseasePrediction(model_name=current_model_name)
    # Train the Model
    dp.train_model()

    # Get Model Performance on Test Data
    test_accuracy, classification_report = dp.make_prediction(saved_model_name=current_model_name,test_data=sample)
    #print("Model Test Accuracy: ", test_accuracy)
    print("Test Data Classification Report: \n", classification_report)
