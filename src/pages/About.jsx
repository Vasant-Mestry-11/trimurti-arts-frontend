import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About E-Commerce app">
      <div className="row container mx-auto contact-container">
        <div className="col-md-6 my-auto left-panel">
          <img
            src="/images/about.jpeg"
            alt="contact us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6 right-panel my-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam aut
          blanditiis provident et adipisci neque nisi dolorem deserunt eos
          quasi, praesentium dolore quis porro aspernatur! Ducimus aliquid,
          fugiat temporibus ipsa harum, ratione eius commodi sapiente laboriosam
          ut placeat et expedita facere iure. Aperiam est ratione hic odio
          numquam nulla placeat vel facere, repellendus unde minus quas
          reprehenderit ipsam, fugit illum necessitatibus nesciunt beatae
          nostrum molestias autem rerum neque? Autem repellat necessitatibus
          alias. Aliquid veniam nisi culpa excepturi animi minima dolore placeat
          saepe eius incidunt, nemo autem recusandae unde, ad ut natus
        </div>
      </div>
    </Layout>
  );
};

export default About;
