import React from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

// function sentiment(text) = ""
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      formData: {
        text: "",
      },
      mood: "",
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({ formData });
  };

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch("http://localhost:5000/prediction/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ mood: response.result, isLoading: false });
      });
    };

  getClouds = () => {
        return (
          <div className="cloudGroup">
           <div className="cloud x1"></div>
            <div className="cloud x2"></div>
            <div className="cloud x3"></div>
            <div className="cloud x4"></div>
            <div className="cloud x5"></div>
          </div>
        );
      }
   

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const mood = this.state.mood;
    
    return (
      <div id="clouds">
        <Container>
          <div>
            <h1 className="title">Welcome to My Mood</h1>
          </div>
          <div className="content">
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>
                    Show me how you feel, I will show you the weather.
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="text"
                    cols="40"
                    rows="5"
                    placeholder="How am I feeling right now..."
                    value={formData.text}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Row>
                <Col>
                  <Button
                    block="block"
                    variant="success"
                    disabled={isLoading}
                    onClick={!isLoading ? this.handlePredictClick : null}
                  >
                    {isLoading ? "Getting mood" : "Get mood"}
                  </Button>
                </Col>
              </Row>
            </Form>
            {mood === "" ? null : (
              <Row>
                <Col className="mood-container">
                <h5 id="mood">{mood}</h5>
                </Col>
              </Row>
            )}
                  
            {mood.includes("POSITIVE") ? 
            (<div className="sun"></div>): 
            (<div className="App">{this.getClouds()}</div>)}
            
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
