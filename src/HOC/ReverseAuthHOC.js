import React from 'react'

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
            console.log('redirecting')
            // this.props.history.push("/")
            // return <Redirect to="/" />
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