// People shown on the Team page.
//
// Photos live in public/Team_photos/. Drop a photo at the `image` path below and
// it appears automatically; until then the card shows a neutral placeholder.
// `description` may be a string or an array of paragraphs.
// Earlier rosters are kept under public/Team_photos/archive/<academic-year>/
// together with a roster.json describing every team and member.

export const facultyCoordinators = [
  {
    id: 'mihir-kumar-das',
    name: 'Prof. Mihir Kumar Das',
    role: 'Dean of Student Affairs',
    school: 'School of Mechanical Sciences',
    image: '/Team_photos/Mihir_Kumar_Das_sir.jpg',
    email: 'mihirdas@iitbbs.ac.in',
    profileUrl: 'https://www.iitbbs.ac.in/index.php/dr-mihir-kumar-das/',
    description: [
      'Prof. Mihir Kumar Das is a Professor in the School of Mechanical Sciences at IIT Bhubaneswar and the ' +
        'institute’s Dean of Student Affairs, the office responsible for student welfare, hostels, clubs and ' +
        'societies, under whose guidance the NSS unit runs its outreach programmes. He is a member of the ' +
        'Institute Senate and serves as the Liaison Officer for SC, ST, OBC, PwD and minority communities.',
      'His research covers thermal management of lithium-ion batteries, phase change materials, electronic ' +
        'cooling, two-phase heat transfer, solar energy applications, heat exchanger design and internal ' +
        'combustion engines.',
    ],
  },
  {
    id: 'ankit-dalal',
    name: 'Dr. Ankit Dalal',
    role: 'NSS Programme Coordinator',
    school: 'School of Electrical & Computer Sciences',
    image: '/Team_photos/Ankit_Dalal_sir.jpg',
    email: 'ankitdalal@iitbbs.ac.in',
    profileUrl: 'https://secs.iitbbs.ac.in/index.php/ankitd/',
    description: [
      'Dr. Ankit Dalal is an Assistant Professor in the School of Electrical and Computer Sciences at ' +
        'IIT Bhubaneswar, which he joined in February 2023. Besides coordinating the NSS unit, he is the ' +
        'Faculty Coordinator of the institute’s Career Development Cell.',
      'An electric-machine design specialist, he works on traction motors for electric vehicles and drones, ' +
        'power electronics, bionics and medical devices, with a focus on rare-earth-free alternatives such as ' +
        'switched reluctance, synchronous reluctance and ferrite-magnet motors to replace conventional BLDC ' +
        'and PMSM machines. He holds a B.Tech in Electrical Engineering from SVNIT Surat (2007) and a Ph.D. ' +
        'from IIT Guwahati (2017), and spent over six years in industry as a motor subject-matter expert at ' +
        'NFTDC Hyderabad, Ather Energy Bengaluru and Portescap India Mumbai.',
    ],
  },
];

export const teamMentor = [
  {
    id: 'himanshu-sharma',
    name: 'Himanshu Sharma',
    role: 'Team Mentor',
    image: '/Team_photos/Himanshu_Sharma.jpg',
  },
];
