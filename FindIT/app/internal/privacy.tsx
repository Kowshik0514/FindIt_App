import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native';
import { useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');

const PrivacyPage = () => {
    const router = useRouter();
    const handlePress = () => {
        Linking.openURL('mailto:privacy@finditapp.com');
      };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Privacy</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Protection</Text>
          <Text style={styles.sectionText}>
            We take your privacy seriously and will ensure that your personal information is protected. We do not share your data with third parties without your consent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <Text style={styles.sectionText}>
            You can manage your privacy settings and decide what information you want to share with others. Adjust your settings according to your preferences.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Access</Text>
          <Text style={styles.sectionText}>
            You have the right to access your data and request changes or deletions. If you need assistance, please contact our support team.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionText}>
            If you have any questions or concerns about our privacy practices, please reach out to us at-{' '}
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.link}>privacy@finditapp.com</Text>
          </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => router.push('../(tabs)/profile')}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2E48A4',
    height: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2E48A4',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PrivacyPage;
