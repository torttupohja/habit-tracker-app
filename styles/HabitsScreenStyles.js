// HabitsScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  list: { marginTop: 20 },
  habitRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 5,
    justifyContent: 'space-between',
    gap: 12,
  },
  habit: { fontSize: 14, paddingVertical: 5, flex: 1 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { fontSize: 20, paddingHorizontal: 10 },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },  
  progressCell: {
    width: 36,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 16,
    overflow: 'hidden',
    includeFontPadding: false,
  },    
  habitNameCell: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
  },
  headerWrapper: {
    paddingHorizontal: 1,
    paddingBottom: 10,
  },
  habitRowWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 5,
  },  
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  addButton: {
    padding: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  }
});

export default styles;
