import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/menus');
                setMenus(response.data);
            } catch (error) {
                console.error('Error fetching menus:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu Cafe</Text>
            <FlatList
                data={menus}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.menuItem}>
                        <Text style={styles.menuName}>{item.name}</Text>
                        <Text style={styles.menuPrice}>Rp {item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    menuItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuPrice: {
        fontSize: 16,
        color: '#666',
    },
});

export default HomeScreen;
