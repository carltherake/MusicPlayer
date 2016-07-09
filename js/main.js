var Files = [],
    FileNames = [],
    TrackIndex = 0;

var SelectSong = function()
{
  TrackIndex = FileNames.indexOf(this.innerHTML);
  LoadSong();
};

var LoadSong = function()
{
  var audioplayer = document.getElementById("audio_player"),
      audiosource = document.getElementById("mp3_src");

  audiosource.src = Files[TrackIndex];
  audioplayer.pause();
  audioplayer.load();
  audioplayer.play();
  $("ul li").removeClass("playing");
  $("li").eq(TrackIndex + 1).addClass("playing");
};

var GetNextTrack = function()
{
  if (TrackIndex < Files.length)
  {
    TrackIndex++;
    LoadSong();
  }
};

var ClearFiles = function()
{
  var audioplayer = document.getElementById("audio_player"),
      albumart = document.getElementById("album_art");
  $("#audio_player").unbind("ended", GetNextTrack);
  audioplayer.pause();
  for (i = 0; i < Files.length; ++i)
  {
    URL.revokeObjectURL(Files[i]);
  }
  $("#folder_select").val('');
  $("ul li:not(:first)").remove();
  albumart.src = '';
  Files = [];
  FileNames = [];
  TrackIndex = 0;
};

var GetFiles = function()
{
  if (window.File && window.FileReader && window.FileList && window.Blob)
  {
  }
  else
  {
    alert("This browser cannot support this upload method");
    return;
  }
  var selectedfolder = document.getElementById("folder_select"),
      files = selectedfolder.files,
      audioplayer = document.getElementById("audio_player"),
      audiosource = document.getElementById("mp3_src"),
      songlist = document.getElementById("song_list"),
      albumart = document.getElementById("album_art");

  for (i = 0; i < files.length; i++) {
    if (files[i].type == "audio/mp3")
    {
      Files.push(URL.createObjectURL(files[i]));
      FileNames.push(files[i].name);
  
      var li = document.createElement('li');
      li.innerHTML = files[i].name;
      songlist.appendChild(li);
      li.onclick = SelectSong;
    } else if (files[i].name == "AlbumArtSmall.jpg")
    {
      albumart.src = URL.createObjectURL(files[i]);
    }
  }
  LoadSong();
  $("#audio_player").on("ended", GetNextTrack);
};

$(function () {
  $("#folder_select").change(GetFiles);
  $("#clear_files").click(ClearFiles);
});