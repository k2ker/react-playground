export default async function Main() {
  return (
    <main className="main">
      <a href="intent://home#Intent;scheme=https;package=com.goldenwalnutapp;end">
        Open App via Intent
      </a>
      <a href="goldenwalnut://">Open App</a>
      <a href="goldenwalnut://permission">Open Permission</a>
    </main>
  );
}
