import React from 'react';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.mapSearchUrl = 'https://maps.locationiq.com/v3/staticmap?';
        this.locationApiKey = process.env.REACT_APP_LOCATION_IQ_API_KEY;
    }

    render() {
        let mapUrl = `${this.mapSearchUrl}key=${this.locationApiKey}&center=${this.props.lat},${this.props.lon}&zoom=18`;
        return (
            <div className="map">
                <img src={`${mapUrl}`} alt=""/>
            </div>
        )
    }
}

export default Map;