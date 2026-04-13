export async function uploadFile(file) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      success: true,
      fileName: file.name,
      url: `/uploads/${file.name}`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Upload failed",
    };
  }
}