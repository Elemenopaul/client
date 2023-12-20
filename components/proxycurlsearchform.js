import React, { useState } from 'react';
import axios from 'axios';

function ProxycurlSearchForm() {
  const [form, setForm] = useState({
    country: '',
    first_name: '',
    last_name: '',
    education_field_of_study: '',
    education_degree_name: '',
    education_school_name: '',
    education_school_linkedin_profile_url: '',
    current_role_title: '',
    past_role_title: '',
    current_role_before: '',
    current_role_after: '',
    current_company_linkedin_profile_url: '',
    past_company_linkedin_profile_url: '',
    current_job_description: '',
    past_job_description: '',
    current_company_name: '',
    past_company_name: '',
    linkedin_groups: '',
    languages: '',
    region: '',
    city: '',
    headline: '',
    summary: '',
    industries: '',
    interests: '',
    skills: '',
    current_company_country: '',
    current_company_region: '',
    current_company_city: '',
    current_company_type: '',
    current_company_follower_count_min: '',
    current_company_follower_count_max: '',
    current_company_industry: '',
    current_company_employee_count_min: '',
    current_company_employee_count_max: '',
    current_company_description: '',
    current_company_founded_after_year: '',
    current_company_founded_before_year: '',
    current_company_funding_amount_min: '',
    current_company_funding_amount_max: '',
    current_company_funding_raised_after: '',
    current_company_funding_raised_before: '',
    public_identifier_in_list: '',
    public_identifier_not_in_list: '',
    page_size: '',
    enrich_profiles: '',
  });



  const [results, setResults] = useState(null);
  const [selectedProfiles, setSelectedProfiles] = useState({});

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? (event.target.checked ? 'enrich' : '') : event.target.value;
    setForm({ ...form, [event.target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const headers = { 'Authorization': 'Bearer xX3lfD4060k_S3IXvSE3Vw' };
      const response = await axios.post('api/proxy', form, { headers }); // include headers in the request
      console.log(response.data); // log the data to the browser's console
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectProfile = (public_identifier) => {
    setSelectedProfiles(prevProfiles => ({
      ...prevProfiles,
      [public_identifier]: !prevProfiles[public_identifier]
    }));
  };

  const handleSaveProfile = async (profile) => {
    const data = {
      public_identifier: profile.public_identifier,
      first_name: profile.first_name,
      last_name: profile.last_name,
      full_name: profile.full_name,
      profile_pic_url: profile.profile_pic_url,
      background_cover_image_url: profile.background_cover_image_url,
      follower_count: profile.follower_count,
      occupation: profile.occupation,
      headline: profile.headline,
      summary: profile.summary,
      city: profile.city,
      state: profile.state,
      country: profile.country,
      country_full_name: profile.country_full_name,
      activities: {
        create: profile.activities.map(activity => ({
          title: activity.title,
          activity_status: activity.activity_status,
          link: activity.link,
        })),
      },
      articles: {
        create: profile.articles.map(article => ({
          title: article.title,
          link: article.link,
        })),
      },
      education: {
        create: profile.education.map(education => ({
          school: education.school,
          school_linkedin_profile_url: education.school_linkedin_profile_url,
          degree_name: education.degree_name,
          field_of_study: education.field_of_study,
          start_date: new Date(education.starts_at.year, education.starts_at.month - 1, education.starts_at.day),
          end_date: education.ends_at ? new Date(education.ends_at.year, education.ends_at.month - 1, education.ends_at.day) : null,
          description: education.description,
          logo_url: education.logo_url,
          grade: education.grade,
          activities_and_societies: education.activities_and_societies,
        })),
      },
      experiences: {
        create: profile.experiences.map(experience => ({
          company: experience.company,
          company_linkedin_profile_url: experience.company_linkedin_profile_url,
          title: experience.title,
          description: experience.description,
          location: experience.location,
          logo_url: experience.logo_url,
          start_date: new Date(experience.starts_at.year, experience.starts_at.month - 1, experience.starts_at.day),
          end_date: experience.ends_at ? new Date(experience.ends_at.year, experience.ends_at.month - 1, experience.ends_at.day) : null,
        })),
      },
      recommendations: {
        create: profile.recommendations.map(recommendation => ({
          recommendation: recommendation.recommendation,
        })),
      },

      accomplishment_organisations: {
        create: profile.accomplishment_organisations.map(org => ({
          name: org.name,
          position: org.position,
          description: org.description,
          logo_url: org.logo_url,
        })),
      },

      volunteer_work: {
        create: profile.volunteer_work.map(work => ({
          starts_at: new Date(work.starts_at.year, work.starts_at.month - 1, work.starts_at.day),
          ends_at: work.ends_at ? new Date(work.ends_at.year, work.ends_at.month - 1, work.ends_at.day) : null,
          title: work.title,
          cause: work.cause,
          company: work.company,
          company_linkedin_profile_url: work.company_linkedin_profile_url,
          description: work.description,
          logo_url: work.logo_url,
        })),
      },

      languages: {
        create: profile.languages.map(language => ({
          name: language.name,
          proficiency: language.proficiency,
        })),
      },

      similarly_named_profiles: {
        create: profile.similarly_named_profiles.map(similarly_named_profile => ({
          name: similarly_named_profile.name,
          link: similarly_named_profile.link,
          summary: similarly_named_profile.summary,
          location: similarly_named_profile.location,
        })),
      },
      linkedin_profile: {
        create: {
          linkedin_profile_url: profile.linkedin_profile.linkedin_profile_url,
          profile_pic_url: profile.linkedin_profile.profile_pic_url,
          background_cover_image_url: profile.linkedin_profile.background_cover_image_url,
          follower_count: profile.linkedin_profile.follower_count,
          occupation: profile.linkedin_profile.occupation,
          headline: profile.linkedin_profile.headline,
          summary: profile.linkedin_profile.summary,
        },
      },
    };
  
    try {
      await prisma.profiles.create({
        data: data,
      });
      console.log('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSaveSelectedProfiles = async () => {
    // Get the selected profiles from the state
    const profilesToSave = Object.keys(selectedProfiles)
      .filter(public_identifier => selectedProfiles[public_identifier])
      .map(public_identifier => results.results.find(profile => profile.profile.public_identifier === public_identifier));
  
    try {
      // Make a POST request to the API endpoint
      const response = await fetch('/api/saveProfiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profilesToSave),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Log the response to the console
      console.log('Profiles saved successfully:', await response.json());
    } catch (error) {
      // Log any errors that occur
      console.error('Error saving profiles:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          key === 'enrich_profiles' ? (
            <label key={key}>
              {key}:
              <input type="checkbox" name={key} checked={form[key] === 'enrich'} onChange={handleChange} />
            </label>
          ) : (
            <input key={key} name={key} value={form[key]} onChange={handleChange} placeholder={key} />
          )
        ))}
        <button type="submit">Search</button>
      </form>
      {results && results.results.map(profile => (
  <div key={profile.profile.public_identifier}>
    <h2>{profile.profile.first_name} {profile.profile.last_name} - {profile.profile.headline}</h2>
    <p>{profile.profile.city}, {profile.profile.state}, {profile.profile.country_full_name}</p>
    <div>Experiences: 
      {profile.profile.experiences && profile.profile.experiences.map((experience, index) => 
        <div key={index}>
          <h3>{experience.title}</h3>
          <p>{experience.company} (Location: {experience.location}) (Start: {experience.starts_at.month}/{experience.starts_at.day}/{experience.starts_at.year}) {experience.ends_at ? `(End: ${experience.ends_at.month}/${experience.ends_at.day}/${experience.ends_at.year})` : '(Current)'}</p>
        </div>)}
    </div>
    <div>Education: 
  {profile.profile.education && profile.profile.education.map((education, index) => 
    <div key={index}>
      <h3>{education.degree_name} in {education.field_of_study}</h3>
      <p>{education.school} (Start: {education.starts_at ? `${education.starts_at.month}/${education.starts_at.day}/${education.starts_at.year}` : 'Start date not available'}) {education.ends_at ? `(End: ${education.ends_at.month}/${education.ends_at.day}/${education.ends_at.year})` : '(Current)'}</p>    </div>)}
</div>
    <button onClick={() => handleMoreInfo(profile.profile.public_identifier)}>More Info</button>
    <input type="checkbox" checked={selectedProfiles[profile.profile.public_identifier] || false} onChange={() => handleSelectProfile(profile.profile.public_identifier)} />
    <button onClick={() => handleSaveProfile(profile)}>Save</button>
  </div>
))}
{results && <button onClick={handleSaveSelectedProfiles}>Save Selected Profiles</button>}
    </div>
  );

}  
  
  export default ProxycurlSearchForm;