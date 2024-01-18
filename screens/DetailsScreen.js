import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { textS, widthRatio, heightRatio, moderateScale } from "../utils/sizes";
import { useColorScheme } from "../theme/colorScheme";

function DetailsScreen({ route }) {
  const { item } = route.params;
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 dark:bg-[#001515]">
      <View className=" bg-slate-200 border-2 border-slate-400 m-3 rounded-3xl h-1/3 dark:bg-[#151c22] dark:border-2 dark:border-slate-400 ">
        <View className="flex-row justify-between p-4  ">
          <Text className="dark:text-white" style={{ fontSize: textS(10) }}>
            Height: {item.height} CM
          </Text>
          <Text className="dark:text-white" style={{ fontSize: textS(10) }}>
            Weight: {item.weight} KG
          </Text>
        </View>

        <View className=" flex-1  justify-center items-center p-4 ">
          <Text
            className="font-bold dark:text-white"
            style={{ fontSize: textS(20) }}
          >
            BMI: {item.bmi}
          </Text>
          <Text
            className="font-bold dark:text-white"
            style={{ fontSize: textS(14) }}
          >
            Classification: {item.classification}
          </Text>
        </View>

        <View className=" flex-row justify-between  ">
          <Text
            className="px-4 pb-2 pt-3 dark:text-white"
            style={{ fontSize: textS(10) }}
          >
            Date: {item.date}
          </Text>
          <Text
            className="px-4 pb-2 pt-3 dark:text-white"
            style={{ fontSize: textS(10) }}
          >
            Time: {item.time}
          </Text>
        </View>
      </View>

      <View className="flex-1 bg-slate-300 border-2 border-slate-400 rounded-3xl mx-3 mb-3 dark:bg-[#151c22] dark:border-2 dark:border-slate-400">
        <ScrollView className=" flex-1  " showsVerticalScrollIndicator={false}>
          <Text
            className="text-justify tracking-wide leading-5 mx-5 my-2 dark:text-white"
            style={{ fontSize: textS(10) }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
            velit eget lacus imperdiet malesuada. Proin nec fringilla neque.
            Suspendisse potenti. Vivamus auctor dui nec metus bibendum, at
            fringilla ligula efficitur. Fusce nec erat dolor. Nullam vehicula
            augue eu elit tincidunt, a facilisis risus efficitur. Vivamus
            pulvinar, purus at tristique tincidunt, justo urna vestibulum mi, in
            ultrices felis erat vel enim. Aliquam erat volutpat. Pellentesque
            tincidunt, lacus sit amet fringilla congue, arcu dui accumsan erat,
            eget fringilla ligula mauris ut odio. Vestibulum sed massa nec sem
            cursus pellentesque eu a libero. Sed eget vehicula erat. Integer
            fringilla, nunc eget convallis vulputate, justo neque consectetur
            quam, ut aliquam elit eros et purus. Integer in nulla a urna
            eleifend finibus. Nunc at lacus in purus volutpat feugiat. Proin
            tristique arcu a quam accumsan, id ultrices libero cursus.
            Suspendisse potenti. Praesent gravida rhoncus odio, vitae congue
            neque fermentum vel. Curabitur a magna vitae nunc dapibus ultrices.
            Etiam interdum mauris et risus facilisis, nec facilisis quam
            scelerisque. Cras in mi a turpis luctus tristique ac non ex. Nunc
            rhoncus, orci vel convallis vestibulum, libero elit fringilla dolor,
            vel pulvinar arcu justo eget risus. Etiam non nisl ut purus mattis
            accumsan. Nulla facilisi. Ut ut risus a lacus volutpat tristique
            eget sit amet velit. Nulla facilisi. Maecenas bibendum lectus vel
            efficitur accumsan. Nam interdum, orci vel suscipit pellentesque,
            mauris ligula interdum dui, nec cursus odio metus sit amet nisi. Ut
            quis nisl id augue commodo auctor. Integer in orci in lectus cursus
            ullamcorper vel non elit. Aenean in lectus sit amet orci ultrices
            hendrerit non sit amet urna. Curabitur eget magna vel libero cursus
            dapibus. Vestibulum auctor venenatis elit, vel fermentum augue
            aliquet quis. Sed vel tristique felis. Aliquam erat volutpat.
            Quisque nec venenatis lacus. Nulla bibendum ullamcorper feugiat.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Duis at bibendum libero, vitae pharetra
            metus. In hac habitasse platea dictumst. Curabitur eu nunc eget
            tortor cursus vulputate. Sed suscipit eget augue nec malesuada.
            Nulla facilisi. Sed euismod, nisl sit amet aliquam ultricies, nunc
            nisl aliquet nunc, eget aliquam nisl nisl eu nisl. Nulla facilisi.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Nulla facilisi.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

export default DetailsScreen;
