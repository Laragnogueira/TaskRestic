import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },
  header: {
    width: '100%', 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#001542',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20, 
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 24,
    paddingLeft: 12,
    color:'#fff'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTabRed: {
    backgroundColor: '#ff6347',
  },
  activeTabYellow: {
    backgroundColor: '#ffd700',
  },
  activeTabGreen: {
    backgroundColor: '#22BABB',
  },
  activeTabText: {
    color: '#fff',
    fontSize: 16,
  },
  tabText: {
    fontSize: 16,
    color: '#000', 
  },
  content: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingVertical: 8, 
    paddingHorizontal: 10, 
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  task: {
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1, 
  },
  taskDetails: {
    flex: 1, 
    marginLeft: 10, 
  },
  taskName: {
    fontSize: 16, 
  },
  dueDate: {
    fontSize: 12,
    color: '#888',
  },
  deleteIcon: {
    padding: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#001542',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  editIcon: {
    padding: 5,
    marginLeft: 10,
    marginEnd: 4,
  },
});

export default styles;
