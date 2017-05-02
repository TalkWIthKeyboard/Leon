/**
 * Created by CoderSong on 17/5/2.
 */
$(document).ready(function () {
  /**
   * 上传组件逻辑
   */
  $('#inputFile').on('change', function () {
    var file = this.files[0];
    uploadingImg(file);
  });

  function uploadingImg(f) {
    var form = new FormData();
    form.append('file', f);
    form.append('name', f.name);
    // console.log(f.name);
    $.ajax({
      url: '/api/file',
      type: 'POST',
      data: form,
      processData: false,
      contentType: false,
      success: function (res) {
        if (res.code.number === 200) {
          alert('ok');
        } else {
          alert('上传文件失败，请重新上传！')
        }
      }
    });
  }
});