// HomeScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 👈 vertical centering
    padding: 24,
  },

  topSpacing: {
    marginTop: 50, // push welcome message down from top
    alignItems: 'center',
  },
  
  centeredQuoteBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },  
  
  quote: {
    fontSize: 24, // ⬆️ made bigger
    textAlign: 'center',
    color: '#444',
    fontFamily: 'ShadowsIntoLight_400Regular',
  },
  
  header: {
    fontSize: 26,
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 44,
    fontFamily: 'ShadowsIntoLight_400Regular',
  },
  
  quoteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 60, // ⬅️ This controls space between quote and button
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },  
  
  button: {
    backgroundColor: '#2e86de',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 60, // ⬅️ Controls space above button
  },   
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ShadowsIntoLight_400Regular',
  },   
});

export default styles;
