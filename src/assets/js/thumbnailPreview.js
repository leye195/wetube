(() => {
  const preview = document.querySelector(".preview"),
    thumbnailBtn = document.querySelector(".thumb");
  const handlePreview = e => {
    const { target } = e;
    if (target.files && target.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        preview.style.backgroundImage = `url(${reader.result})`;
      };
      reader.readAsDataURL(target.files[0]);
    }
  };
  const init = () => {
    if (thumbnailBtn) thumbnailBtn.addEventListener("change", handlePreview);
  };
  init();
})();
