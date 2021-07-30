import React , {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileGithub =({username, getGithubRepos, repos})=> {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos, username])

  return (
    <div className='profile-github'>
      <h2 className="text-primary my-1">Github Repos</h2>
      {
        repos === null ? <Spinner/> :(
          repos.map(r=>(
            <div key={r._id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href={r.html_url} target='_blank' rel='noopener noreferrer'>
                    {r.name}
                  </a>
                </h4>
                <p>{r.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {r.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Stars: {r.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Stars: {r.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))
        )
      }
    </div>
  )
}

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos:PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
}

const mapStateToProps = state =>({
  repos: state.profile.repos
})

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub)

