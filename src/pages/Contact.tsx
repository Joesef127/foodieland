import { useState } from "react";
import { Button, FormInput, Heading, SubHeading } from "../utils/Utils";
import smiling_chef from "../assets/images/smiling_chef.png";
import Newsletter from "../components/Newsletter";
import SelectDropdown from "../utils/SelectDropdown";
import { OptionType } from "../utils/Types";

const enquiryTypeOptions = [
  { id: 1, name: "General Enquiry" },
  { id: 2, name: "Feedback" },
  { id: 3, name: "Support" },
  { id: 4, name: "Advertising" },
  { id: 5, name: "Complaint" },
  { id: 6, name: "Other" },
];

export default function Contact() {
  const [selectedEnquiryType, setSelectedEnquiryType] = useState<OptionType>();

  return (
    <div className="pb-20 overflow-y-scroll relative inter">
      <section className="relative flex justify-center items-center mt-10 gap-20">
        <div className="w-[95%] sm:w-[90%] flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col justify-between items-center">
            <Heading text="Contact Us" />
            <SubHeading text="We would love to hear from you!" />
          </div>

          <div>
            <div className="w-full flex justify-between gap-5">
              <div
                className="relative rounded-3xl shadow-md flex justify-center items-center px-5 py-0"
                style={{
                  background: "linear-gradient(to bottom, white, #EDFAFD)",
                }}
              >
                <img src={smiling_chef} alt="Smiling chef" className="-mb-3" />
              </div>

              {/* </div>
          <div className="flex items-center justify-center"> */}
              <form className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-2 gap-5 w-full">
                  <FormInput
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                    id="name"
                    label="NAME"
                    customClass="text-gray-700"
                    inputStyle="text-sm"
                    labelStyle="text-xs"
                    required={true}
                  />

                  <FormInput
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    id="email"
                    label="EMAIL"
                    customClass="text-gray-700"
                    inputStyle="text-sm"
                    labelStyle="text-xs"
                    required={true}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <FormInput
                    placeholder="Enter subject"
                    type="text"
                    name="subject"
                    id="subject"
                    label="SUBJECT"
                    customClass="text-gray-700"
                    inputStyle="text-sm"
                    labelStyle="text-xs"
                    required={true}
                  />

                  <SelectDropdown
                    label="Enquiry Type"
                    options={enquiryTypeOptions}
                    selected={selectedEnquiryType || enquiryTypeOptions[0]}
                    onChange={setSelectedEnquiryType}
                    buttonStyle="border border-gray-300 bg-transparent shadow:sm focus:border-indigo-500 focus:ring-indigo-500"
                    optionStyle="w-full"
                    labelStyle="text-xs font-normal text-gray-700 uppercase"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  className="border rounded-lg p-2"
                  rows={4}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <Button text="Submit" customClass="bg-black text-white" />
        </div>
      </section>
      <section className="my-32 ">
        <Newsletter />
      </section>

      <section>
        <Heading text="Check out the delicious recipe" />
      </section>
    </div>
  );
}
