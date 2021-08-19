import React from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import Axuiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component{
        
        constructor(props){
            super(props);
            this.state= {
                error: null
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;

            });
            this.reqResponse =axios.interceptors.response.use(res => res, error => {
                this.setState({error:error});
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqResponse);
        }

        errorConfirmedHandler = () =>{
            this.setState({error:null});
        }

        render (){
            return(
                <Axuiliary>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                <WrappedComponent{...this.props} />
                </Axuiliary>
                );
        }
        
    }
};

export default withErrorHandler;
