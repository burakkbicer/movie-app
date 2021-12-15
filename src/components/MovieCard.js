import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Fonts from '../constants/Fonts';
import Images from '../constants/Images';
import { getPoster, getLanguage } from '../services/MovieService';

const MovieCard = ({
  title,
  language,
  voteAverage,
  voteCount,
  poster,
  size,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        style={{ ...styles.container, width: 230 * size, height: 340 * size }}
        imageStyle={{ borderRadius: 12 }}
        source={{ uri: getPoster(poster) }}
      >
        <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size }}>
          <Image
            source={Images.IMDB}
            resizeMode='cover'
            style={{ ...styles.imdbImage, height: 20 * size, width: 50 * size }}
          />
          <Text
            style={{
              ...styles.imdbRating,
              marginRight: 5 * size,
              fontSize: 14 * size,
            }}
          >
            {voteAverage}
          </Text>
        </View>
        <TouchableNativeFeedback onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={25 * size}
            color={liked ? Colors.HEART : Colors.WHITE}
            style={{ position: 'absolute', bottom: 10, left: 10 }}
          />
        </TouchableNativeFeedback>
      </ImageBackground>
      <View>
        <Text
          style={{ ...styles.movieTitle, width: 230 * size }}
          numberOfLines={3}
        >
          {title}
        </Text>
        <View style={styles.movieSubTitleContainer}>
          <Text style={styles.movieSubTitle}>
            {getLanguage(language).english_name}
          </Text>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name='heart'
              size={17 * size}
              color={Colors.HEART}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.movieSubTitle}>{voteCount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

MovieCard.defaultProps = {
  size: 1,
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  movieTitle: {
    fontFamily: Fonts.EXTRA_BOLD,
    color: Colors.GRAY,
    paddingVertical: 2,
    marginTop: 5,
    width: 230,
  },
  movieSubTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  movieSubTitle: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: Colors.YELLOW,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  imdbImage: {
    height: 20,
    width: 50,
    borderBottomLeftRadius: 5,
  },
  imdbRating: {
    marginRight: 5,
    color: Colors.HEART,
    fontFamily: Fonts.EXTRA_BOLD,
  },
});
