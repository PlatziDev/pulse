import { Component } from 'react'
import Router from 'next/router'
import Icon from '../components/icon'

export default class extends Component {
  componentDidMount() {
    setTimeout(() => {
      Router.push({
        pathname: '/editor',
      })
    }, 2000)
  }

  render() {
    return (
      <main>
        <div id="splash">
          <h1 id="title">Pulse</h1>
          <span id="spinner">
            <Icon name="spinner" />
          </span>
          <h2 id="subtitle">Initializing</h2>
        </div>

        <style jsx>{`
          #splash {
            background-color: #058ecd;
            color: white;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          #title {
            font-size: 3em;
            margin: 0;
          }
          #subtitle {
            font-size: 1.5em;
            margin: 15px 0;
          }
          #spinner {
            font-size: 5em;
            animation-name: spinner;
            animation-iteration-count: infinite;
            animation-duration: 1s;
            animation-timing-function: ease-in-out;
            transform-origin: center;
          }

          @keyframes spinner {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          `}</style>
      </main>
    )
  }
}
