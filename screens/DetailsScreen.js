import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StatusBar  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <SafeAreaView>
    <View className='bg-purple-200 p-4 rounded-lg mt-4'>
    
                      <View className="flex-col justify-between items-start gap-1 ">
                        <Text>Height: {item.height} CM</Text>
                        <Text>Weight: {item.weight} KG </Text> 
                      </View>
                      <View className="justify-center items-center p-4">
                        <Text className="font-bold text-2xl">BMI: {item.bmi} </Text>
                        <Text className="font-bold text-2xl">Classification: {item.classification} </Text>
                      </View>
                      <View className="flex-row justify-between items-center ">
                        <Text>Date: {item.date} </Text>
                        <Text>Time: {item.time} </Text> 
                      </View>
                      <View>
                        <Text className="pt-4 font-bold">Recommendation:</Text>
                        <ScrollView>
                        <Text className="mt-4 font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Elementum sagittis vitae et leo duis ut diam quam. Interdum consectetur libero id faucibus. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. Elit ullamcorper dignissim cras tincidunt. Ultrices tincidunt arcu non sodales. Felis bibendum ut tristique et egestas quis ipsum. At auctor urna nunc id cursus metus aliquam eleifend mi. Ut tellus elementum sagittis vitae et leo. Dis parturient montes nascetur ridiculus. Nulla pellentesque dignissim enim sit. Ut consequat semper viverra nam libero. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Dictumst quisque sagittis purus sit amet volutpat consequat. Maecenas sed enim ut sem viverra aliquet eget. Imperdiet nulla malesuada pellentesque elit eget gravida cum.

                        Diam sollicitudin tempor id eu nisl. Velit egestas dui id ornare arcu odio ut sem. Nisi quis eleifend quam adipiscing vitae. Consequat interdum varius sit amet. Ut sem viverra aliquet eget sit amet tellus cras. Platea dictumst vestibulum rhoncus est pellentesque. Nulla facilisi cras fermentum odio eu feugiat. Dictumst vestibulum rhoncus est pellentesque. Habitant morbi tristique senectus et netus. Ac tincidunt vitae semper quis lectus nulla. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. A erat nam at lectus urna duis convallis. Lorem mollis aliquam ut porttitor. Nibh venenatis cras sed felis eget velit. Duis convallis convallis tellus id interdum velit laoreet id.

                        Duis at tellus at urna condimentum. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Vel turpis nunc eget lorem dolor sed viverra ipsum. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Tincidunt arcu non sodales neque sodales ut etiam sit. Ullamcorper a lacus vestibulum sed. Feugiat in fermentum posuere urna nec. In hac habitasse platea dictumst quisque sagittis purus sit. Pulvinar pellentesque habitant morbi tristique senectus. Eu sem integer vitae justo eget magna fermentum iaculis. Nulla posuere sollicitudin aliquam ultrices.

                        Ante metus dictum at tempor commodo ullamcorper a. Consequat id porta nibh venenatis cras. Sagittis eu volutpat odio facilisis. Et egestas quis ipsum suspendisse ultrices gravida dictum. Integer feugiat scelerisque varius morbi enim nunc. Interdum consectetur libero id faucibus nisl tincidunt. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Viverra nam libero justo laoreet sit amet. Magna sit amet purus gravida quis. Id aliquet lectus proin nibh nisl condimentum id. Vivamus at augue eget arcu dictum varius. Ac feugiat sed lectus vestibulum mattis. Tristique nulla aliquet enim tortor at auctor urna nunc id. Blandit cursus risus at ultrices. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. In dictum non consectetur a erat. Ut diam quam nulla porttitor massa id neque aliquam. Leo integer malesuada nunc vel risus.

                        Sed arcu non odio euismod. Senectus et netus et malesuada fames ac. Sagittis nisl rhoncus mattis rhoncus. Semper eget duis at tellus at urna condimentum mattis pellentesque. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Augue ut lectus arcu bibendum at varius. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Leo in vitae turpis massa sed elementum. Dui faucibus in ornare quam viverra orci sagittis eu. Nunc id cursus metus aliquam eleifend mi in nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Proin fermentum leo vel orci porta non pulvinar neque.

                        Sed arcu non odio euismod. Senectus et netus et malesuada fames ac. Sagittis nisl rhoncus mattis rhoncus. Semper eget duis at tellus at urna condimentum mattis pellentesque. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Augue ut lectus arcu bibendum at varius. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Leo in vitae turpis massa sed elementum. Dui faucibus in ornare quam viverra orci sagittis eu. Nunc id cursus metus aliquam eleifend mi in nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Proin fermentum leo vel orci porta non pulvinar neque.
                        
                        Sed arcu non odio euismod. Senectus et netus et malesuada fames ac. Sagittis nisl rhoncus mattis rhoncus. Semper eget duis at tellus at urna condimentum mattis pellentesque. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Augue ut lectus arcu bibendum at varius. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Leo in vitae turpis massa sed elementum. Dui faucibus in ornare quam viverra orci sagittis eu. Nunc id cursus metus aliquam eleifend mi in nulla. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Proin fermentum leo vel orci porta non pulvinar neque.
                        </Text>
                        </ScrollView>
                      </View>

    </View>
    </SafeAreaView>
  );
}

export default DetailsScreen;
