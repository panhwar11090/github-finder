import React, { useEffect, Fragment, useContext } from 'react'
import Spinner from '../Layouts/Spinner';
import Repos from '../repos/Repos';
import { Link , useParams} from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User =()=>{
    const githubContext = useContext(GithubContext);
    const {user, loading, getUser, getUserRepos, repos} = githubContext;   
    const {login: userLogin} = useParams(); 
    useEffect(()=>{
        getUser(userLogin);
        getUserRepos(userLogin);
        // eslint-disable-next-line        
    }, []);

    const {name, company, avatar_url, location, bio, blog, html_url, followers, following, public_repos, public_gists, hireable} = user;

    if(loading) return <Spinner/>

    return (
        <Fragment>
            <Link to='/' className="btn btn-light">Back to Search Results</Link>
            Hireable: { hireable ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times-circle text-danger"></i> }
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt="Profile" className="round-img" style={{width:'150px'}} />
                    <h2>{name}</h2>
                    {location && (
                        <Fragment>
                            <h5>Location: {location}</h5>
                        </Fragment>
                    )}
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1' target='_blank' rel='noreferrer'>Github Profile</a>
                    <ul>
                        <li>
                            {user.login && (
                                <Fragment>
                                    Username: {user.login}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {company && (
                                <Fragment>
                                    Company: {company}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <Fragment>
                                    Website: {blog}
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>public_gists: {public_gists}</div>
            </div>
            <Repos repos={repos}/>
        </Fragment>
    )  
}



export default User
