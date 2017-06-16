import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

class Map extends Component {
    render() {
        return (
            <Card fluid className='Map'>
                <Card.Content>
                    <Card.Header content="Map" />
                    <Card.Description content={<Image src="map.svg" />} />
                </Card.Content>
            </Card>
        );
    }
}
export default Map;