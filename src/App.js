import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import TeacherLogin from './components/TeacherLogin';
import StudentHome from './components/StudentHome';
import StudentLogin from './components/StudentLogin';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import EditQuiz from './components/EditQuiz';
import Score from './components/Score';
import Scoreboard from './components/Scoreboard';
import Practice from './components/Practice';
import EditPractice from './components/EditPractice';
import Navbar from './components/Navbar';
import Teacher from './components/Teacher';

import AddQuestionForm from './components/AddQuestionForm';
import EditQuestionForm from './components/EditQuestionForm';
import AddPQuestionForm from './components/AddPQuestionForm';
import EditPQuestionForm from './components/EditPQuestionForm';
import './App.css';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/quiz', '/practice',  '/scoreboard', '/editquiz', '/editpractice','/AddQuestionForm','/EditQuestionForm','/AddPQuestionForm','/EditPQuestionForm' ,'/dashboard'];
  
  return (
    <div className="App">
      {hideNavbarRoutes.indexOf(location.pathname) === -1 && <Navbar />}
      <Switch>
        <Route exact path="/">
          <div className="start-screen-background">
            <StartScreen />
          </div>
        </Route>
        <Route exact path="/student-home">
          <div className="start-screen-background">
            <StudentHome />
          </div>
        </Route>
        <Route exact path="/teacher-login">
          <div className="login-background">
            <TeacherLogin />
          </div>
        </Route>
        <Route exact path="/student-login">
          <div className="login-background">
            <StudentLogin />
          </div>
        </Route>
        <Route exact path="/quiz">
          <div className="quiz-background">
            <Quiz />
          </div>
        </Route>
        <Route exact path="/scoreboard">
          <div className="edit-background">
            <Scoreboard />
          </div>
        </Route>
        <Route exact path="/dashboard">
          <div className="edit-background">
            <Dashboard />
          </div>
        </Route>
        <Route exact path="/editquiz">
          <div className="edit-background">
            <EditQuiz />
          </div>
        </Route>
        <Route exact path="/editpractice">
          <div className="edit-background">
            <EditPractice />
          </div>
        </Route>
        <Route exact path="/practice">
          <div className="practice-background">
            <Practice />
          </div>
        </Route>
        <Route exact path="/teacher">
          <div className="teacher-background">
            <Teacher />
          </div>
        </Route>
        <Route exact path="/AddQuestionForm">
          <div className="edit-background">
            <AddQuestionForm />
          </div>
        </Route>
        <Route exact path="/EditQuestionForm">
          <div className="edit-question-background">
            <EditQuestionForm />
          </div>
        </Route>
        <Route exact path="/AddPQuestionForm">
          <div className="edit-background">
            <AddPQuestionForm />
          </div>
        </Route>
        <Route exact path="/EditPQuestionForm">
          <div className="edit-question-background">
            <EditPQuestionForm />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;







