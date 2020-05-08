import React from 'react'
import {Redirect} from 'react-router-dom'

const ReverseAuthHOC = WrappedComponent => {
    return class ReverseAuthHOC extends React.Component {
        isAuthorized = () => {
            if (localStorage.getItem("token")) {
                return true
            } else {
                return false
            }
        }

        alertAndRedirect = () => {
            return <Redirect to="/" />
        }

        render() {
            return (
                <> {!this.isAuthorized()
                    ?<WrappedComponent {...this.props} />
                    :
                    this.alertAndRedirect()
                    }
                </>
            )
        }
    }
}

export default ReverseAuthHOC;