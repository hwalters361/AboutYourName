import { useState } from "react";

export default function Entry({}) {
  const [content, setContent] = useState("");

  function submit(e) {
    e.preventDefault(); /* don't actually submit the form */
    setContent("");
  }

  return (
    <form onSubmit={submit}>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
    </form>
  );
}
