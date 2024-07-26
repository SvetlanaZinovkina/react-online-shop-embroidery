const verifyAdmin = async (request, reply) => {
		try {
				await request.jwtVerify();
				if (request.user.role !== 'admin') {
						reply.code(403).send({ error: 'Forbidden' });
				}
		} catch (err) {
				reply.send(err);
		}
};

export default;
