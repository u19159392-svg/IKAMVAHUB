-- ==========================
-- SCHOOL DETAILS TABLE
-- ==========================

CREATE TABLE IF NOT EXISTS school_details (
    id INTEGER PRIMARY KEY,
    school_id INTEGER NOT NULL,
    facilities TEXT,
    subjects_offered TEXT,
    FOREIGN KEY (school_id) REFERENCES schools(id)
);

INSERT OR IGNORE INTO school_details (id, school_id, facilities, subjects_offered) VALUES
(1, 1, 'Classrooms; Limited rural infrastructure', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences, Physical Sciences'),
(2, 2, 'Classrooms; Agricultural demonstration areas', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Agricultural Sciences, Agricultural Technology, Life Sciences, Geography'),
(3, 3, 'Standard classrooms', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences'),
(4, 4, 'Classrooms; Government-owned buildings', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Accounting, Life Sciences, Geography, History, Agricultural Sciences'),
(5, 5, 'Standard government school facilities', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History'),
(6, 6, 'Classrooms; Government-owned buildings', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences'),
(7, 7, 'Classrooms; Government-owned buildings', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences'),
(8, 8, 'Standard government classrooms', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences'),
(9, 9, 'Classrooms; Government-owned buildings', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences, Physical Sciences, Accounting, Business Studies, Economics, Tourism, Consumer Studies'),
(10, 10, 'Technical workshops; Practical labs; Classrooms', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Civil Technology, Electrical Technology, Mechanical Technology, Engineering Graphics and Design, Technical Sciences'),
(11, 11, 'Standard government classrooms', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences'),
(12, 12, 'Standard government school facilities', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences'),
(13, 13, 'Classrooms; Government-owned buildings', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation, Life Sciences, Geography, History, Agricultural Sciences'),
(14, 14, 'Standard government school facilities', 'isiXhosa, English, Mathematics/Mathematical Literacy, Life Orientation');

-- ==========================
-- SCHOOL CONTACTS TABLE
-- ==========================

CREATE TABLE IF NOT EXISTS school_contacts (
    id INTEGER PRIMARY KEY,
    school_id INTEGER NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    website TEXT,
    FOREIGN KEY (school_id) REFERENCES schools(id)
);

INSERT OR IGNORE INTO school_contacts (id, school_id, phone, email, address, website) VALUES
(1, 1, '', '', 'Amadiba A/A, Baleni Location, Bizana, 4800', ''),
(2, 2, '+27 72 695 2704', '', 'Lugangeni A/A, Ntenetyana Location, Mount Frere, 5090', ''),
(3, 3, '+27 83 765 3530', '', 'Toleni A/A, Mount Frere, 5090', ''),
(4, 4, '', '', 'Ntlamvini A/A, Tabankulu, 5090', ''),
(5, 5, '', '', 'Mount Frere Area, Umzimvubu Local Municipality, 5090', ''),
(6, 6, '+27 78 047 6019', '', 'Box 366, Mount Frere, 5090', ''),
(7, 7, '+27 83 487 4922 / +27 39 255 0095', '', 'Dangwana A/A, Mount Frere, 5090', ''),
(8, 8, '+27 39 254 0068', '', 'Mvuzo Area, Mount Frere, 5090', ''),
(9, 9, '+27 72 150 1808 / +27 82 334 1997', '', 'Mpendla A/A, Mount Frere, 5090', ''),
(10, 10, '', '', 'Tabankulu, 5130', ''),
(11, 11, '', '', 'Mount Frere Area, Umzimvubu Local Municipality, 5090', ''),
(12, 12, '', '', 'Mvenyane Area, Mount Frere, 5090', ''),
(13, 13, '+27 79 209 2377', '', 'Cabazi A/A, Mount Frere, 5090', ''),
(14, 14, '', '', 'Mount Frere Area, Eastern Cape', '');