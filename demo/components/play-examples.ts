export default [
  {
    name: 'Hello World ($bind)',
    code: `// Hello World ($bind)
const state = '';
const view = state => <div>
  <h1>Hello {state}</h1>
  <input $bind />
</div>;
app.start(document.body, state, view, {});
`
  },

  {
    name: 'Hello World ($on)',
    code: `// Hello World ($on)
const state = {};
const view = ({who}) => <div>
  <h1>Hello {who}</h1>
  <input $oninput="hello" />
</div>;
const update = {
  'hello': (_, e) => ({who:e.target.value})
}
app.start(document.body, state, view, update);
`
  },

  {
    name: 'Hello World (debounce)',
    code: `// Hello World (debounce)
const state = '';
const view = state => <div>
  <h1>Hello {state}</h1>
  <input $oninput />
</div>;
const update = {
  'oninput': [(_, e) => e.target.value, { delay: 300 }]
}
app.start(document.body, state, view, update);
`
  },

  {
    name: 'Clock',
    code: `// Clock
const state = new Date();
const view = state => <h1>{state.toLocaleTimeString()}</h1>;
const update = {
  'timer': state => new Date()
}
window.setInterval(() => { app.run('timer') }, 1000);
app.start(document.body, state, view, update);
`
  },

  {
    name: 'Stopwatch',
    code: `// Stopwatch
const state = {
  start: new Date(),
  active: false,
  elapsed: '0'
}
const view = state => {
  return <div>
    <h1>{state.elapsed}</h1>
    <button $onclick="start">Start</button>
    <button $onclick="stop">Stop</button>
  </div>;
};
const update = {
  'start':state =>({
    start: new Date(),
    active: true}),
  'stop': state => ({ ...state, active: false }),
  'timer': state => {
    if(state.active){
      state.elapsed = ((new Date() - state.start) / 1000).toFixed(3) + ' seconds';
      return state
    }
  }
};
window.setInterval(() => { app.run('timer') }, 100);
app.start(document.body, state, view, update);
`
  },

  {
    name: 'Counter (JSX)',
    code: `// Counter (JSX)
const state = 0;
const view = state => <div>
  <h1>{state}</h1>
  <button $onclick='-1'>-1</button>
  <button $onclick='+1'>+1</button>
</div>;
const update = {
  '+1': state => state + 1,
  '-1': state => state - 1
};
app.start(document.body, state, view, update);
`
  },

  {
    name: 'Counter (HTML)',
    code: `// Counter (HTML)
const state = 0;
const view = state => \`<div>
  <h1>\${state}</h1>
  <button onclick="app.run('-1')">-1</button>
  <button onclick="app.run('+1')">+1</button>
</div>\`;
const update = {
  '+1': state => state + 1,
  '-1': state => state - 1
};
app.start(document.body, state, view, update);
`,
    noJSX: true
  },

  {
    name: 'Counter (Web Component)',
    code: `// Counter (Web Component)
class Counter extends Component {
  constructor() {
    super();
    this.state = 0;
    this.view = state => \`<div>
      <h1>\${state}</h1>
      <button onclick='counter.run("-1")'>-1</button>
      <button onclick='counter.run("+1")'>+1</button>
      </div>\`;
    this.update = {
      '+1': state => state + 1,
      '-1': state => state - 1
    };
  }
}
const wc = document.createElement('my-app');
wc.id = 'counter';
document.body.appendChild(wc);
app.webComponent('my-app', Counter);
`,
    noJSX: true
  },

  {
    name: 'Async fetch',
    code: `// Async fetch
const state = {};
const view = (state) => <>
  <div><button $onclick='fetchComic'>XKCD</button></div>
  {state.comic && <>
    <h3>{state.comic.title}</h3>
    <img src={state.comic.url} />
  </>}
</>;
const update = {
  'fetchComic': async _ => {
    const response = await fetch('https://xkcd-imgs.herokuapp.com/');
    const comic = await response.json();
    return {comic};
  }
};
app.start(document.body, state, view, update);
`
  },

  {
    name: 'Animation Directive',
    code: `// Animation Directive
app.on('$', (key, props) => {
  if (key === '$animation') {
    const value = props[key];
    if (typeof value === 'string') {
      props.class = \`animated \${value}\`;
    }
  }
});

const state = {
  animation: true
}

const view = state => <>
  <img $animation={state.animation && 'bounce infinite'} src='logo.png' />
  <div $animation='bounceInRight'>
    <button disabled={state.animation} $onclick='start-animation'>start</button>
    <button disabled={!state.animation} $onclick='stop-animation'>stop</button>
  </div>
</>

const update = {
  '#animation': state => state,
  'start-animation': state => ({ ...state, animation: true }),
  'stop-animation': state => ({...state, animation: false})
}
app.start(document.body, state, view, update);
`
  }

];
