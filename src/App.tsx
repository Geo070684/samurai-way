import React from 'react';
import './App.css';
import {mySideBar} from './components/Navbar/Navbar';
import {myDialogsDataType} from "./components/Dialogs/Dialogs";
import {BrowserRouter, HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Setting from './Router/Setting/Setting';
import {myPostType} from './Profile/MyPost/MyPost';
import {myMessageType} from './components/Dialogs/Message/Message';
import {AllActionType} from './components/Redux/Store';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {initialiseAppTC, viewGlobalErrorTC} from './components/Redux/AppReducer';
import store, {AllAppStateType} from './components/Redux/RedaxStore';
import Preloader from './components/common/preloader/Preloader';
import {withSuspense} from "./HOC/WithSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));
const News = React.lazy(() => import('./Router/News/News'));
const Music = React.lazy(() => import('./Router/Music/Music'));

export type TypeForAllData = {

    profilePage: {
        posts: myPostType[]
        newPostText: string
    },
    dialogsPage: {
        dialogs: myDialogsDataType[]
        messages: myMessageType[]
        newDialogsMessage: string
        answerMessages: myMessageType[]
    }
    sideBar: {
        sideBar: mySideBar[]
    }
}

export type AppStateType = {
    appState: TypeForAllData
    dispatch: (
        action: AllActionType
    ) => void
}
type MapStateToPropsType = {
    initialized: boolean
    globalError: string | null
}
type MapDispatchToPropsType = {
    initialiseAppTC: () => void,
    viewGlobalErrorTC: (error: string) => void
}

const mapStateToProps = (state: AllAppStateType): MapStateToPropsType => ({
    initialized: state.initialized.initialized,
    globalError: state.initialized.globalError
})

export type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<AppPropsType> {

    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
debugger
        this.props.viewGlobalErrorTC(promiseRejectionEvent.reason)
        this.props.globalError && alert(this.props.globalError.toString())
        console.log(this.props.globalError)
    }

    componentDidMount() {
        this.props.initialiseAppTC()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavbarContainer/>
                {/*{this.props.globalError && <div>{this.props.globalError.toString()}</div>}*/}
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        {/*//обозначение параментра для withRouter в "match/path/userId"*/}
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                        <Route path='/users' render={() =>
                            <UsersContainer/>}/>
                        <Route path='/login' render={() =>
                            <Login/>}/>
                        <Route path='/news' render={withSuspense(News)}/>
                        <Route path='/music' render={withSuspense(Music)}/>
                        <Route path='/setting' render={Setting}/>
                        <Route path='*' render={() => <div>404 Not Found</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

let AppContainer = connect(mapStateToProps,
    {initialiseAppTC, viewGlobalErrorTC})(App)

export let MainApp = () => {
    return (<HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}