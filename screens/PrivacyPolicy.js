import * as React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../assets/colors/colors";
import Accordion from "../common/Accordion";
import AgentAccordion from "../common/AgentAccordion";
import GoBack from "../common/GoBack";

//

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GoBack navigation={navigation} title="Privacy Policy" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.terms}>
          <Text style={styles.heading}>Hapartment Privacy Policy</Text>
          <Text style={styles.text}>
            This service is operated by Hapartment limited. If you visit our
            website, use our apps or contact us, this policy is for you. It's
            about how we protect your data and respect your privacy.
          </Text>

          <Text style={styles.heading}>Our responsibility</Text>
          <Text style={styles.text}>
            Hapartment is the “controller”of your personal data. This means we
            decide how and why your data is processed any time you use our
            products or services. We go into this in more detail below.
          </Text>

          <Text style={styles.heading}>Your responsibility</Text>
          <Text style={styles.text}>
            Please read this policy and make sure you’re happy with it before
            using our services.
          </Text>

          <Text style={styles.heading}>
            Your property information on Hapartment
          </Text>
          <Text style={styles.text}>
            This policy applies to the personal information you share with us,
            not the information about properties we show on our websites or
            apps. This information is about the property itself, not about the
            occupants or owners of that property. If you have any questions
            about the property information we display, please contact our
            customer care team. If you’re renting or letting a property that’s
            being advertised on our website or apps, please direct any questions
            to your estate agent.
          </Text>

          <Text style={styles.heading}>
            Your property information on Hapartment
          </Text>
          <Text style={styles.text}>
            This policy applies to the personal information you share with us,
            not the information about properties we show on our websites or
            apps. This information is about the property itself, not about the
            occupants or owners of that property. If you have any questions
            about the property information we display, please contact our
            customer care team. If you’re renting or letting a property that’s
            being advertised on our website or apps, please direct any questions
            to your estate agent.
          </Text>

          <Text style={styles.heading}>Data we collect about you</Text>
          <Text style={styles.text}>
            When you use our online services, we collect data about your visit,
            including which web pages you visited. Sometimes you might give us
            data, such as your email address. In this section, we outline what
            information we collect about you when you use our services, why we
            collect it and the legal basis on which we use it.
          </Text>

          <Text style={styles.heading}> Information about you</Text>
          <Text style={styles.text}>
            Your contact details {"\n"} E.g Your address, email address or phone
            number. {"\n"} Why do we collect this data? {"\n"} We use this
            information to distinguish you from other users, and to contact you
            if we need to. To use our My Home service, we’ll ask you about your
            relationship to the property address. Any data we collect from you
            will be used to provide products and services to help you make the
            most of your home, unless you ask us not to. If you sign up to
            receive property alerts or marketing emails, we’ll send them to your
            given email address. If you send a message to an agent through
            Hapartment, we’ll share your contact details with them so they can
            contact you.
          </Text>

          <Text style={styles.heading}>How it benefits you</Text>
          <Text style={styles.text}>
            You can contact us about our services and get the property alerts
            and marketing emails that you want. You’ll hear directly from agents
            or developers you’ve contacted via hapartment. By using our My Home
            service and sharing your address with us, we’ll be able to provide
            you with personalized products and services tailored to your home.
            Legal basis under data protection law: Legitimate interests, and
            consent (where you have opted-in to email marketing)
          </Text>

          <Text style={styles.heading}>My Hapartment account information</Text>
          <Text style={styles.text}>
            E.g. Your login details, preferences and properties you save in your
            My Home service. Why we collect this data We use this information to
            maintain your account, save your preferences and manage the
            properties you save in our My Home service. We use this information
            in conjunction with other data we’ve collected from your site visits
            (such as when you last logged in your account), to create audience
            segments. These segments help us to make sure any content or ads we
            share with you via email or your mobile, or on our website, or
            elsewhere on the internet, are relevant to you. How it benefits you
            You get a much more personalized experience when it comes to
            services such as property alerts and saved searches, and
            recommendations we think are relevant to you. Legal basis under data
            protection law: Legitimate interests.
          </Text>

          <Text style={styles.heading}> Marketing preferences</Text>
          <Text style={styles.text}>
            E.g. Your marketing email subscription preferences. Why we collect
            this data We use this information so we can remind you of all the
            ways we can help and hopefully encourage you to use Hapartment more
            often. We also get paid by some trusted businesses, such as new
            homes developers, to send you marketing emails on their behalf. We
            do not share your contact details with anyone, except with those
            third parties who provide services to us, and subject to our
            contract terms which requires them to keep your data safe and not to
            use it for any other purpose.
          </Text>

          <Text style={styles.heading}>Audience building</Text>
          <Text style={styles.text}>
            We use data to create different audience categories for those who
            share interests relating to the property market. First-time renter
            is one example of a category. We assign you an audience category
            based on your browsing behavior on our site, and any data you give
            us during registration or when you send a lead to an agent. We
            include information about the areas and property features you’re
            interested in. {"\n"}
            Why we collect this data {"\n"} It enables us to show you
            information online about properties we think you’ll like. And we can
            better tailor advertising to your interests. This means we get paid
            more for our advertising slots. We can also send emails on other
            businesses’ behalf so that we do not need to share it with third
            parties. We can show the effectiveness and relevance of our
            advertising campaigns by taking anonymised and aggregated
            statistical and demographic data. {"\n"}
            How it benefits you {"\n"}
            You have a more personalized online experience using our websites
            and apps Legal basis under data protection law: Legitimate interests
          </Text>

          <Text style={styles.heading}>How long do we store your data</Text>
          <Text style={styles.text}>
            We only keep your data long enough to carry out the task we
            collected it for. After that time, we safely delete it. The exact
            amount of time varies depending on the type of data and how we use
            it.
          </Text>

          <Text style={styles.heading}>Contact us</Text>
          <Text style={styles.text}>
            If you have any questions or concerns about our use of your personal
            information, or wish to inquire about our personal information
            handling practices, and exercise your rights to access, correct or
            inquire about deletion of personal information, please contact us
            via support@hapartment.org.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  terms: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  heading: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 30,
    color: colors.primary,
    lineHeight: 30,
  },
  text: {
    lineHeight: 35,
    fontSize: 15,
    color: colors.textDark,
  },
});
