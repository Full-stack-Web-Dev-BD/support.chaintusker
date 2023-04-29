import { create } from "ipfs-http-client";
import { toast } from "react-toastify";

const projectId = "2Oe40BVTX2gKa9tHbFBKSAxGDeE";
const projectSecret = "05e8fb3900b69e39949fce9c61539687";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

// Create an IPFS client and export it
export const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

// Asset upload function on change of the Asset input field
export const uploadAsset = async (e) => {
  try {
    const added = await ipfs.add(e);
    // Our uploaded asset will be available with dedicated URL: https://tusker.infura-ipfs.io/ipfs/{hash}
    const url = `https://tusker.infura-ipfs.io/ipfs/${added.path}`;
    toast.success("Asset uploaded successfully!");
    return url;
  } catch (error) {
    console.log("Error uploading file: ", error);
    toast.error("Error uploading file: ", error);
  }
};