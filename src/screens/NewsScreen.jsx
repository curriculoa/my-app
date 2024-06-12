import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

export default function NewsScreen() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando notícias...</Text>
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
            <FlatList
                data={news}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => (
                    <View style={styles.newsItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    newsItem: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
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
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
