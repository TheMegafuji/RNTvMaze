import theme from '../../themes/default';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dialog} from 'react-native-paper';
import React from 'react';

const DetailDialog = ({showDialog, setShowDialog, dialogContent}) => {
  return (
    <Dialog
      style={{
        backgroundColor: theme.colors.dark_background,
        borderRadius: 16,
        marginHorizontal: 48,
      }}
      visible={showDialog}
      onDismiss={() => setShowDialog(false)}>
      {dialogContent != null && (
        <View>
          {dialogContent.image && dialogContent.image.original != null ? (
            <Image
              style={{
                width: '100%',
                height: 200,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
              source={{uri: dialogContent.image.original}}
            />
          ) : (
            <View
              style={styles.substituteImage}>
              <Text
                style={[
                  styles.movieTitle,
                  {color: theme.colors.dark_primary},
                ]}>
                No Image
              </Text>
            </View>
          )}
          <Text style={styles.header}>{dialogContent.name}</Text>
          <Text style={styles.dialogText}>
            {`Season ${dialogContent.season} - Episode ${dialogContent.number}`}
          </Text>
          <Text style={styles.header}>Summary</Text>
          {dialogContent.summary != null && (
            <ScrollView>
              <Text style={styles.dialogText}>
                {dialogContent.summary.replace(/(&nbsp;|<([^>]+)>)/gi, '')}
              </Text>
            </ScrollView>
          )}
        </View>
      )}
      <TouchableOpacity
        style={styles.dialogButton}
        onPress={() => setShowDialog(false)}>
        <Icon
          name={'clear'}
          style={styles.headerIcon}
          size={36}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </Dialog>
  );
};

export default DetailDialog;
