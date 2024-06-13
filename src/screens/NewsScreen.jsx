import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function NewsScreen() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://newsdata.io/api/1/news?apikey=pub_457874f52a4b4612242e0eaa24e49cd12d3aa&q=News')
            .then(response => response.json())
            .then(data => {
                setNews(data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Erro ao carregar notícias');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E90FF" />
                <Text style={styles.loadingText}>Carregando notícias...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.navigate('Login')} />
                <Appbar.Content title="Notícias" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.newsList}>
                    {news.map((item) => (
                        <View key={item.link} style={styles.newsItem}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>NewsApp</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#1E90FF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#1E90FF',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    newsList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsItem: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1E90FF',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#1E90FF',
    },
});
