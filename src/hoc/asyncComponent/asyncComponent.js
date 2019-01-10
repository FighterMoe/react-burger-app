import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
    return {
        <importComponent {...this.props}/>
    }
}

export default asyncComponent;