function FooterMain() {
  return (
    <footer className="footer my-sticky has-background-black-ter">
      <section className="container">
        <div className="content has-text-centered">
          <ul style={{ listStyle: "none" }}>
            <li>
              <div className="is-size-7 has-text-light">
                Благодарность{" "}
                <a href="https://punkapi.com" target="_blank" rel="noreferrer">
                  https://punkapi.com/
                </a>{" "}
                за предоставленное API.
              </div>
            </li>
            <li>
              <div className="is-size-7  has-text-light">
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
