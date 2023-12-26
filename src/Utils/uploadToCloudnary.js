export const uploadToCloudnary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "oriz_social");
    data.append("cloud_name", "doz9r6yqy");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/doz9r6yqy/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    const fileData = await res.json();
    return fileData.url.toString();
  } else {
    console.log("error from upload function!");
  }
};
