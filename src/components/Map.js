import React, { PureComponent } from 'react';
import { Container } from 'semantic-ui-react';
import map from './../config/map.json';

class Map extends PureComponent {
    render() {
        return (
            <Container text className='Map'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                     preserveAspectRatio="none" width="100%" viewBox="0 0 1016 1016">
                    <path fill="#aaa" stroke="none" d={map.data} />
                    <circle cx="375" cy="360" r="300" style={{ fill: 'none', stroke: 'blue', strokeWidth: '3' }} />
                    <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                    </g>
                </svg>
            </Container>
        );
    }
}
export default Map;