import React from 'react';


export class SelectBox extends React.Component {

    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
        this.state = {
            date: new Date()
        };
    }

    render() {
        return (
            <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <select 
                    onChange = { this.changeName }
                >
                    <option value = "John">
                        John
                    </option>
                    <option value = "Elissa">
                        Elissa
                    </option>
                    <option value = "Clara">
                        Clara
                    </option>
                </select>
                <div>
                    {this.state.date.toLocaleTimeString()}
                </div>
            </div>
        )
    }

    changeName(event) {
        this.props.onChange(event.target.value);
    }

    componentDidMount() {
        this.startInterval();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    startInterval() {
        this.intervalID = setInterval(() => {
            this.setState({
                date: new Date()
            });
        }, 500);
    }

}