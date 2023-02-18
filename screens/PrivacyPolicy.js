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
            We collect and use your personal data because we need it to deliver
            our services. We also look after your privacy and make sure you have
            a great experience every time you use our site or app. If you're
            happy with that, read on to learn more about how we deal with your
            data.
          </Text>

          <Text style={styles.heading}>Our responsibility</Text>
          <Text style={styles.text}>
            At Hapartment, we want to be completely transparent about how we
            collect and process your personal data. As the controller of your
            data, we decide how and why it is processed at any time when you use
            our products or services.
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
            The property information we display on our website and app isn't
            about the occupants or owners of that property. If you have any
            questions about the property information we display, please contact
            our customer care team. If you're renting or letting a property
            that's being advertised on our website or app, please direct any
            questions to your estate agent.
          </Text>

          <Text style={styles.heading}>Data we collect about you</Text>
          <Text style={styles.text}>
            We collect personal information about you when you use our services.
            This helps us to understand your requirements and make sure that we
            provide you with the best possible experience when using our
            website.
          </Text>
          <Text style={styles.text}>
            In this section, we outline what information we collect about you
            when you use our services, and why we collect it.
          </Text>

          <Text style={styles.heading}> Information about you</Text>
          <Text style={styles.text}>
            Your contact details : E.g Your full name and email address.
          </Text>
          <Text style={styles.heading}>Why do we collect this data?</Text>
          <Text style={styles.text}>
            We use the information you give us to provide the services you need,
            and to make sure we're providing them to the right people. If you
            sign up for property alerts or marketing emails, we will send them
            to your given email address. If you send a message through
            Hapartment, we'll share your contact details with the relevant agent
            or developer so they can contact you.
          </Text>

          <Text style={styles.heading}>How it benefits you</Text>
          <Text style={styles.text}>
            Hapartment is a property search tool that makes it easy for you to
            find the best apartment for you. We offer email alerts and marketing
            emails so that you can be informed about any developments in the
            market.
          </Text>

          <Text style={styles.heading}>My Hapartment account information</Text>
          <Text style={styles.text}>
            E.g. Your login details, preferences and properties you save in your
            My Home service.
          </Text>
          <Text style={styles.heading}>Why we collect this data</Text>
          <Text style={styles.text}>
            We use the information you provide to maintain your account, save
            your preferences and manage properties you save in our My Home
            service. We also use this information with other data like, when
            last time you logged into your account, create audience segments.
            These segments help us make sure any content or ads we share with
            you via email or mobile devices, or on our website or elsewhere on
            the internet are relevant to you.
          </Text>
          <Text style={styles.heading}>How it benefits you</Text>
          <Text style={styles.text}>
            You get a much more personalized experience when it comes to
            services such as property alerts and saved searches, and
            recommendations we think are relevant to you.
          </Text>

          {/*  */}
          <Text style={styles.heading}>Marketing preferences</Text>
          <Text style={styles.text}>
            E.g. Your marketing email subscription preferences.
          </Text>
          <Text style={styles.heading}>Why we collect this data</Text>
          <Text style={styles.text}>
            We love your feedback and want to make sure that our services meets
            your needs. We use this information so we can remind you of all the
            ways we can help and hopefully encourage you to use Hapartment more
            often. We do not share your contact details with anyone, except with
            those third parties who provide services to us, and subject to our
            contract terms which require them to keep your data safe and not to
            use it for any other purpose.
          </Text>
          <Text style={styles.heading}>How it benefits you</Text>
          <Text style={styles.text}>
            You get information about the latest properties that match your
            search criteria, we can also send you marketing emails that are
            relevant to you. You’ll only hear from us about products and
            services we think will interest you.
          </Text>

          {/*  */}
          <Text style={styles.heading}>
            Information about how you use our products and services
          </Text>
          <Text style={styles.text}>
            E.g. Information about how you got to, and use our websites and
            apps.
          </Text>
          <Text style={styles.heading}>Why we collect this data</Text>
          <Text style={styles.text}>
            We collect information about you for two main reasons. The first is
            to understand how you use our website and app, so we can improve our
            service and provide more relevant advertising. The second reason is
            to allow trusted businesses like yours to advertise on our site, so
            we can keep providing a free service for all users.
          </Text>
          <Text style={styles.heading}>How it benefits you</Text>
          <Text style={styles.text}>
            It means Hapartment is free to use. Plus, you’ll see the most
            relevant information and adverts for you.
          </Text>

          {/*  */}
          <Text style={styles.heading}>
            Ad platform remarketing and cookies
          </Text>
          <Text style={styles.text}>
            With your consent, and in accordance with our cookie policy, we use
            cookies to save and retrieve information about your visit to our
            website.
          </Text>
          <Text style={styles.text}>
            We also allow some third parties, such as Facebook to use cookies to
            collect information from our websites and apps. They use this to
            help us advertise Hapartment on other websites and social media, and
            also to help us find others who might be interested in Hapartment’s
            services.
          </Text>
          <Text style={styles.text}>
            For example, Facebook uses a custom audience pixel, which is why you
            might see Hapartment ads on Facebook after you have been on our
            websites. We use the Facebook pixel to display our ads to Facebook
            users who’ve previously shown an interest in our website and the
            products and services advertised on it. We also display our ads to
            those who’ve shown an interest in certain locations or properties
            within a particular price range,or those who’ve shown intent to rent
            a property
          </Text>

          {/*  */}

          {/*  */}
          <Text style={styles.heading}>Surveys and response</Text>
          <Text style={styles.text}>
            E.g, Feedback tools on our websites, apps and emails.
          </Text>
          <Text style={styles.heading}>Why we collect this data</Text>
          <Text style={styles.text}>
            We sometimes ask for your opinion about our services to measure how
            we’re doing and make improvements.
          </Text>
          <Text style={styles.heading}>How it benefits you</Text>
          <Text style={styles.text}>
            You can directly influence what changes and improvements we make to
            our websites and apps.
          </Text>

          <Text style={styles.heading}>Legal basis: Legitimate interest</Text>
          <Text style={styles.text}>
            We’re allowed to use your data if it’s necessary for our (or someone
            else’s) legitimate interests, provided those interests are not
            outweighed by your rights nor have any negative impact on you. Our
            legitimate interests are:
          </Text>
          <Text style={styles.text}>
            Providing and improving our services{"\n"}
            Enabling you to save property searches, claim your home and carry
            out other tasks using your Hapartment account.{"\n"}
            Personalizing your experience of our services and learning from the
            way you use our services{"\n"}
            Making sure our services are secure
          </Text>

          <Text style={styles.heading}>Cookies</Text>
          <Text style={styles.text}>
            To improve your experience, Hapartment Digital Marketplace uses
            cookies and similar technologies. A cookie is a piece of information
            we automatically place on your device so we can remember something
            about it or you. When you first visit our website, we’ll ask for
            your consent to non-essential cookies for advertising and
            personalization.Cookies help us monitor and improve our services,
            and to personalize your experience.
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
