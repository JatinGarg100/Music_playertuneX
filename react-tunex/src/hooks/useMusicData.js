// This hook will provide all the music data (albums, artists, songs)
export const useMusicData = () => {
  // Albums data
  const albums = [
    {
      id: 'album-a-for-arjan2',
      type: 'album',
      title: 'A For Arjan2',
      subtitle: 'Arjan Dhillon',
      image: '/images/A_for_Arjan2.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      detailPage: '/album/a-for-arjan2'
    },
    {
      id: 'album-limitless',
      type: 'album',
      title: 'Limitless',
      subtitle: 'Prem Dhillon',
      image: '/images/limitless.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      detailPage: '/album/limitless'
    },
    {
      id: 'album-simpsons',
      type: 'album',
      title: 'Simpsons',
      subtitle: 'Cheema Y',
      image: '/images/simpsons.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      detailPage: '/album/simpsons'
    },
    {
      id: 'album-alpha',
      type: 'album',
      title: 'Alpha',
      subtitle: 'Jordan Sandhu',
      image: '/images/alpha.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      detailPage: '/album/alpha'
    },
    {
      id: 'album-a-for-arjan',
      type: 'album',
      title: 'A for Arjan',
      subtitle: 'Arjan Dhillon',
      image: '/images/a_for_arjan.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      detailPage: '/album/a-for-arjan'
    },
    {
      id: 'album-young-goat',
      type: 'album',
      title: 'Young Goat',
      subtitle: 'Cheema Y',
      image: '/images/young_goat.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      detailPage: '/album/young-goat'
    },
    {
      id: 'album-way-maker',
      type: 'album',
      title: 'Way Maker',
      subtitle: 'Navaan Sandhu',
      image: '/images/way_maker.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      detailPage: '/album/waymaker'
    },
    {
      id: 'album-v8',
      type: 'album',
      title: 'V8',
      subtitle: 'Join us',
      image: '/images/join_us.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      detailPage: '/album/v8'
    },
    {
      id: 'album-sicario',
      type: 'album',
      title: 'Sicario',
      subtitle: 'Shubh',
      image: '/images/sicario.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
      detailPage: '/album/sicario'
    },
    {
      id: 'album-timeless',
      type: 'album',
      title: 'Timeless',
      subtitle: 'Hustinder',
      image: '/images/timeless.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      detailPage: '/album/timeless'
    }
  ];

  // Artists data
  const artists = [
    {
      id: 'artist-arjan-dhillon',
      type: 'artist',
      title: 'Arjan Dhillon',
      subtitle: 'Punjabi Pop',
      image: '/images/arjan-dhillon.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      detailPage: '/artist/arjan-dhillon'
    },
    {
      id: 'artist-karan-aujla',
      type: 'artist',
      title: 'Karan Aujla',
      subtitle: 'Punjabi Rapper',
      image: '/images/aujla.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      detailPage: '/artist/karan-aujla'
    },
    {
      id: 'artist-sidhu-moosewala',
      type: 'artist',
      title: 'Sidhu Moosewala',
      subtitle: 'Legend',
      image: '/images/sidhu1.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      detailPage: '/artist/sidhu'
    },
    {
      id: 'artist-diljit',
      type: 'artist',
      title: 'Diljit',
      subtitle: 'Urban Punjabi',
      image: '/images/diljit1.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      detailPage: '/artist/diljit'
    },
    {
      id: 'artist-prem-dhillon',
      type: 'artist',
      title: 'Prem Dhillon',
      subtitle: 'Punjabi Pop',
      image: '/images/prem_dhillon.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      detailPage: '/artist/prem'
    },
    {
      id: 'artist-amrinder-gill',
      type: 'artist',
      title: 'Amrinder Gill',
      subtitle: 'Folk Legend',
      image: '/images/amrinder_gill.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      detailPage: '/artist/amrinder'
    },
    {
      id: 'artist-jordan-sandhu',
      type: 'artist',
      title: 'Jordan Sandhu',
      subtitle: 'Punjabi Pop',
      image: '/images/jordan1.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      detailPage: '/artist/jordan'
    },
    {
      id: 'artist-babbu-maan',
      type: 'artist',
      title: 'Babbu Maan',
      subtitle: 'Punjabio Pop',
      image: '/images/babbu_maan.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      detailPage: '/artist/babbu-maan'
    },
    {
      id: 'artist-sharry-maan',
      type: 'artist',
      title: 'Sharry Maan',
      subtitle: 'Folk Music',
      image: '/images/sharry.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
      detailPage: '/artist/sharry'
    },
    {
      id: 'artist-shubh',
      type: 'artist',
      title: 'Shubh',
      subtitle: 'Hip hop',
      image: '/images/shubh1.jpg',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      detailPage: '/artist/shubh'
    }
  ];

  // Songs data
  const songs = [
    {
      id: 'song-astarr',
      type: 'song',
      title: 'Astarr',
      subtitle: 'Prem Dhillon',
      image: '/images/4_da_gang.jpg',
      audioSrc: '/songs/astarr.mp3'
    },
    {
      id: 'song-paparaazi',
      type: 'song',
      title: 'Paparaazi',
      subtitle: 'Arjan Dhillon',
      image: '/images/paparaazi.jpg',
      audioSrc: '/songs/paparaazi.mp3'
    },
    {
      id: 'song-join-us',
      type: 'song',
      title: 'Join Us',
      subtitle: 'Jass Bajwa',
      image: '/images/join_us.jpg',
      audioSrc: '/songs/join_us.mp3'
    },
    {
      id: 'song-gods-grace',
      type: 'song',
      title: "God's Grace",
      subtitle: 'Jordan Sandhu',
      image: '/images/gods_grace.jpg',
      audioSrc: '/songs/Gods_grace.mp3'
    },
    {
      id: 'song-alarm',
      type: 'song',
      title: 'Alarm',
      subtitle: 'Cheema Y',
      image: '/images/young_goat.jpg',
      audioSrc: '/songs/alarm.mp3'
    },
    {
      id: 'song-king-shit',
      type: 'song',
      title: 'King Shit',
      subtitle: 'Shubh',
      image: '/images/king_shit.jpg',
      audioSrc: '/songs/king_shit.mp3'
    },
    {
      id: 'song-pittal',
      type: 'song',
      title: 'Pittal',
      subtitle: 'Sidhu Moosewala',
      image: '/images/pittal.jpg',
      audioSrc: '/songs/pittal.mp3'
    },
    {
      id: 'song-winning-speech',
      type: 'song',
      title: 'Winning Speech',
      subtitle: 'Karan Aujla',
      image: '/images/winning_speech.jpg',
      audioSrc: '/songs/winning_speech.mp3'
    },
    {
      id: 'song-responsibility',
      type: 'song',
      title: 'Responsibility',
      subtitle: 'Dilpreet Dhillon',
      image: '/images/responsibility.jpg',
      audioSrc: '/songs/responsibility.mp3'
    },
    {
      id: 'song-cartier',
      type: 'song',
      title: 'Cartier',
      subtitle: 'Navaan Sandhu',
      image: '/images/paper_before_money.jpg',
      audioSrc: '/songs/cartier.mp3'
    },
    {
      id: 'song-reshmi-rumaal',
      type: 'song',
      title: 'Reshmi Rumaal',
      subtitle: 'Arjan Dhillon',
      image: '/images/A_for_Arjan.jpg',
      audioSrc: '/songs/reshmi_rumaal.mp3'
    },
    {
      id: 'song-wonders',
      type: 'song',
      title: 'Wonders',
      subtitle: 'Nimrat Khaira',
      image: '/images/wonders.jpg',
      audioSrc: '/songs/wonders.mp3'
    },
    {
      id: 'song-vail-purane',
      type: 'song',
      title: 'Vail Purane',
      subtitle: 'Hustinder',
      image: '/images/timeless.jpg',
      audioSrc: '/songs/vail_purane.mp3'
    },
    {
      id: 'song-sohni-kudi',
      type: 'song',
      title: 'Sohni Kudi',
      subtitle: 'Amrinder Gill',
      image: '/images/sohni_kudi.jpg',
      audioSrc: '/songs/sohni_kudi.mp3'
    },
    {
      id: 'song-hussan-illahi',
      type: 'song',
      title: 'Hussan Illahi',
      subtitle: 'Wazir Pattar',
      image: '/images/hussan_illahi.jpg',
      audioSrc: '/songs/hussan_illahi.mp3'
    }
  ];

  const allItems = [...albums, ...artists, ...songs];

  return {
    albums,
    artists,
    songs,
    allItems
  };
};
