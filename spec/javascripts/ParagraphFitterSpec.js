describe("ParagraphFitter", function() {
  var paragraphFitterView;
  var paragraphFitter;

  beforeEach(function() {
    paragraphFitterView = new ParagraphFitterView();
    paragraphFitter = new ParagraphFitter(paragraphFitterView);
  });

  it("should be able to do something cool", function() {
    paragraphFitter.split(5, "In August 2013, Gunn posted on his Facebook page that Tyler Bates would be composing the film's score. Gunn stated that Bates would write some of the score first so that he can film to the music, as opposed to scoring to the film.[129] In February 2014, Gunn revealed that the film would incorporate songs from the 1970s and 1980s, such as 'Hooked on a Feeling', on a mixtape in Quill's Walkman, which acts as a way for him to stay connected to the Earth, home and family he lost.[130] In May 2014, Gunn added that using the songs from the 70s and 80s were 'cultural reference points', saying, 'It’s striking the balance throughout the whole movie, through something that is very unique, but also something that is easily accessible to people at the same time. The music and the Earth stuff is one of those touchstones that we have to remind us that, yeah, [Quill] is a real person from planet Earth who’s just like you and me. Except that he’s in this big outer space adventure.'[121]")
    expect(paragraphFitterView.selectParagraph.innerText.toEqual("In August 2013,
Gunn posted on his
Facebook page that
Tyler Bates would
be composing the
film's score. Gunn
stated that Bates
would write some of
the score first so
that he can film to
the music, as
opposed to scoring
to the film.[129]
In February 2014,
Gunn revealed that
the film would
incorporate songs
from the 1970s and
1980s, such as
'Hooked on a
Feeling', on a
mixtape in Quill's
Walkman, which acts
as a way for him to
stay connected to
the Earth, home and
family he
lost.[130] In May
2014, Gunn added
that using the
songs from the 70s
and 80s were
'cultural reference
points', saying,
'It’s striking the
balance throughout
the whole movie,
through something
that is very
unique, but also
something that is
easily accessible
to people at the
same time. The
music and the Earth
stuff is one of
those touchstones
that we have to
remind us that,
yeah, [Quill] is a
real person from
planet Earth who’s
just like you and
me. Except that
he’s in this big
outer space
adventure.'[121]");

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');


    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
