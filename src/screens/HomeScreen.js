import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import GenreCard from '../components/GenreCard';
import ItemSeparator from '../components/ItemSeparator';
import MovieCard from '../components/MovieCard';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
} from '../services/MovieService';

const Genres = ['All', 'Action', 'Comedy', 'Romance', 'Horror', 'Sci-Fi'];

const HomeScreen = () => {
  const [activeGenre, setActiveGenre] = useState('All');
  const [nowPlayingMovies, setnowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([{ id: 10110, name: 'All' }]);

  useEffect(() => {
    getNowPlayingMovies().then((movieResponse) =>
      setnowPlayingMovies(movieResponse.data)
    );
    getUpcomingMovies().then((movieResponse) =>
      setUpcomingMovies(movieResponse.data)
    );
    getAllGenres().then((genreResponse) =>
      setGenres([...genres, ...genreResponse.data.genres])
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style='auto'
        translucent={false}
        backgroundColor={Colors.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <GenreCard
              genreName={item.name}
              active={item.name === activeGenre ? true : false}
              onPress={setActiveGenre}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
            />
          )}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View>
        <FlatList
          data={upcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.7}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Fonts.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: Colors.ACTIVE,
    fontFamily: Fonts.BOLD,
  },
  genreListContainer: {
    paddingVertical: 10,
  },
});

export default HomeScreen;
