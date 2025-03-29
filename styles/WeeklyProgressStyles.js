import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    paddingHorizontal: 1,
    width: '100%',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
  },

  habitNameCell: {
    flex: 3.2, // try 3.2 or more
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 11,
    paddingLeft: 5,
    paddingVertical: 8,
  },    

  habitNameText: {
    flex: 3.2,
    fontWeight: 'normal',  // 👈 Regular font
    fontSize: 11,
    paddingLeft: 5,
    paddingVertical: 8,
    textAlign: 'left',
  },
  
  progressCell: {
    width: 30, // or more if needed
    height: 30,
    flex: 1,
    textAlign: 'center',
    fontSize: 9.5,
    paddingVertical: 6,
    lineHeight: 15,
    includeFontPadding: false,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },   

  iconCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    fontSize: 17,
  },
});

export default styles;
