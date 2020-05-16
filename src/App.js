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
      theme: "",
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

   handleBackground = () => {
    if (!this.state.mood) {
      return startBackground;
    } else if (this.state.mood === "NEGATIVE") {
      return cloudFromCss;
    } else {
      return sunFromCss;
    }
  }; 

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const mood = this.state.mood;

    const sunFromCss = {
      ".sun": {
        position: "absolute",
        margin: "auto",
        borderRadius: "50%",
        top: "0",
        right: "0",
        bottom: "80%",
        left: "60%",
        backgroundColor: "rgb(252, 174, 7)",
        height: "50px",
        width: "50px",
        animationName: "beat",
        animationDuration: "3s",
        animationIterationCount: "infinite",
        transform: "scale(2.5)",
        opacity: "0.8",
      },
      "@keyframes backdiv": { "50%": { background: "#bde6f3" } },
      "@keyframes beat": {
        "0%": { transform: "scale(2.5) rotate(-45deg)" },
        "50%": { transform: "scale(2) rotate(-45deg)" },
      },
    };

    const startBackground = {
      "#clouds": { padding: "100px 0", background: "#c9dbe9" },
    };

    const cloudFromCss = {
      "#clouds": { padding: "100px 0", background: "#c9dbe9" },
      ".cloud": {
        width: "200px",
        height: "60px",
        background: "#fff",
        borderRadius: "200px",
        animationName: "moveclouds",
        animationIterationCount: "infinite",
        position: "relative",
      },
      ".cloud:before,\n.cloud:after": {
        content: '""',
        position: ["absolute", "absolute"],
        background: "#fff",
        width: "100px",
        height: "80px",
        top: "-15px",
        left: "10px",
        borderRadius: "100px",
        transform: "rotate(30deg)",
      },
      ".cloud:after": {
        width: "120px",
        height: "120px",
        top: "-55px",
        left: "auto",
        right: "15px",
      },
      ".x1": { opacity: "0.8", animationDuration: "15s" },
      ".x2": {
        left: "200px",
        transform: "scale(0.6)",
        opacity: "0.6",
        animationDuration: "25s",
      },
      ".x3": {
        left: "-250px",
        top: "-200px",
        opacity: "0.8",
        animationDuration: "20s",
      },
      ".x4": {
        left: "470px",
        top: "-250px",
        transform: "scale(0.75)",
        opacity: "0.75",
        animationDuration: "18s",
      },
      ".x5": {
        left: "-150px",
        top: "-150px",
        transform: "scale(0.8)",
        opacity: "0.8",
        animationDuration: "20s",
      },
      "@keyframes moveclouds": {
        "0%": { marginLeft: "1000px" },
        "100%": { marginLeft: "-1000px" },
      },
    };

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
            {() => this.handleBackground()}

            }
            
          </div>
        </Container>

        <div className="cloud x1"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
        {/*
        <div className="back"></div> */}

        <div className="sun"></div>
      </div>
    );
  }
}

export default App;
