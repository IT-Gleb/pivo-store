function FooterMain() {
  return (
    <footer className="footer my-sticky has-background-primary">
      <section className="container">
        <div className="content has-text-centered">
          <ul style={{ listStyle: "none" }}>
            <li>
              <div className="is-size-7">
                Благодарность{" "}
                <a href="https://punkapi.com" target="_blank">
                  https://punkapi.com/
                </a>{" "}
                за предоставленное API.
              </div>
            </li>
            <li>
              <div className="is-size-7  has-text-dark ">
                &copy; Все права принадлежат разработчику. Gleb Torgashin.
                &copy; 2022-2023.
              </div>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
}

export default FooterMain;
