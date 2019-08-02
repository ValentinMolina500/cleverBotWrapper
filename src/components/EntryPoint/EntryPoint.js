import React, {
  Component
} from 'react';
import TextDisplay from "../TextDisplay/TextDisplay";
import BottomBar from "../BottomBar/BottomBar";

export default class EntryPoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: [],
      recognition: this.setupRecognition(),
      cs: '',
      API_KEY: 'CC8srKyiHqx77hURUxkjduSJnCw',
      synth: window.speechSynthesis,
      isSpeaking: false,
    }

    this.latestText = React.createRef();
  }

  speak = () => {
    if(!this.state.isSpeaking) {
      this.setState({
        ...this.state,
        isSpeaking: true
      })
      this.state.recognition.start();
    }
  }

  setupRecognition = () => {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.onresult = event => {
      const response = event.results[0][0].transcript;
      console.log(response);
      let dialog = this.state.dialog;

      dialog.push({
        type: 'input',
        text: response,
      })
      this.setState({
        ...this.state,
        isSpeaking: false,
        dialog: dialog
      });

      let input = encodeURIComponent(response);

      let url = "https://www.cleverbot.com/getreply";

      fetch(url + '?key=' + this.state.API_KEY + '&input=' + input)
        .then(async (res) => {
          let response = await res.json();
          var voices = this.state.synth.getVoices();
          console.log(response);


          const utterThis = new SpeechSynthesisUtterance(response.output);
          utterThis.voice = voices[5];

          this.state.synth.speak(utterThis);

          let dialog = this.state.dialog;
          
          dialog.push({
            type: 'response',
            text: response.output
          })

          this.setState({
            ...this.state,
            cs: response.cs,
            dialog: dialog
          });

          this.speak();
        });
    }

    recognition.onend = () => {
      this.setState({
        ...this.state,
        isSpeaking: false
      });
    }

    return recognition;
  }

  speechCancel = () => {
    this.state.recognition.abort();
  }
  render() {
    return (
      <div>
        <TextDisplay dialog={this.state.dialog} latest={this.latestText}/>
        <BottomBar isSpeaking={this.state.isSpeaking} speak={this.speak} cancel={this.speechCancel}/>
      </div>
    )
  }
}