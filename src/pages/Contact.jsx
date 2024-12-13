import Layout from "../components/Layout/Layout";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { MdHeadsetMic } from "react-icons/md";

const Contact = () => {
  return (
    <Layout title="Contact">
      <div className="row container mx-auto contact-container">
        <div className="col-md-6 my-auto left-panel">
          <img
            src="/images/contactus.jpeg"
            alt="contact us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6 right-panel">
          <button className="bg-dark p-2 text-white text-center contact-button">
            Contact Us
          </button>
          <p className="mt-3">
            <HiOutlineMailOpen /> : <span>www.help@ecommerceapp.com</span>
          </p>
          <p className="mt-3">
            <FiPhoneCall /> : <span>012-3456789</span>
          </p>
          <p className="mt-3">
            <MdHeadsetMic /> :<span>1800-0000-0000 (toll-free)</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
