<script>
  import Welcome from "./Welcome.svelte";
  export let didMount;
  export let modelChanged;
  export let modelChangedDebounce;
  let defaultCode = `const greeting = "Hello World!"`
  let userInput = $didMount.sandbox.getText() || defaultCode ;


  $: {
    const {sandbox, container} = $didMount;
    console.groupCollapsed("didMount");
    console.info("sandbox", sandbox);
    console.info("container", container);
    console.groupEnd();
  }

  $: {
    const {sandbox} = $didMount;
    sandbox.setText(userInput);
  }


  $: {
    const { sandbox, model } = $modelChanged;
    console.groupCollapsed("modelChanged");
    console.info("sandbox", sandbox);
    console.info("model", model);
    console.groupEnd();
  }

  $: {
    const { sandbox, model } = $modelChangedDebounce;
    console.groupCollapsed("modelChangedDebounce");
    console.info("sandbox", sandbox);
    console.info("model", model);
    console.groupEnd();
  }

  function handleClear() {
    $didMount.sandbox.setText("")
    userInput = ""
  }
</script>

<main>
  <Welcome />
  <input bind:value="{userInput}" autofocus />
  <br />
  <button on:click={handleClear}>Clear</button>
</main>

<style>
  main {
    margin: 0 auto;
    text-align: center;
    background: rgb(24, 24, 24);
    min-height: 100vh;
    padding: 20px;
  }

  input {
    height: 20px;
    width: 300px;
    border: none;
    border-radius: .4rem;
    padding: 10px;
    font-size: 1.1rem;
    background: rgb(24, 24, 24);
    color: #f5f5f5;
    outline: none;
    box-shadow: -5px -5px 10px 0px rgba(43, 43, 43, .5),6px 6px 16px 0px rgba(0, 0, 0, 0.7);
    transition: box-shadow .3s;
  }

  input:focus, input:hover {
    box-shadow: -5px -5px 10px 0px rgba(43, 43, 43, .8),6px 6px 16px 0px rgba(0, 0, 0, 1);
  }
  button {
    border: none;
    background: none;
    color: dodgerblue;
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
    margin: 5px;
    outline: none;
    border-radius: .4rem;
    transition: background-color .5s;
  }

  button:hover {
    background: rgb(61, 61, 61);
  }
</style>
